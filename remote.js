// LG TV Remote CLI - A Node.js remote control for LG WebOS TVs
// GitHub: https://github.com/your-username/lg-tv-remote-cli

const fs = require('fs');
const lgtv = require('lgtv2');
const wol = require('wol');

// --- Configuration Loading ---
let config;
try {
    const rawConfig = fs.readFileSync('config.json');
    config = JSON.parse(rawConfig);
} catch (error) {
    console.error("❌ Error: 'config.json' not found or is invalid.");
    console.error("Please copy 'config.json.example' to 'config.json' and fill in your TV's details.");
    process.exit(1);
}

const tvUrl = `ws://${config.tv_ip}:3000`;

// --- Helper function to show usage ---
const showUsage = () => {
    console.log('Usage: node remote.js <command>');
    console.log('\nAvailable commands:');
    console.log('  on              - Turns the TV on (requires MAC address)');
    console.log('  off             - Turns the TV off');
    console.log('  volumeUp        - Increases volume');
    console.log('  volumeDown      - Decreases volume');
    console.log('  mute            - Mutes the sound');
    console.log('  unmute          - Unmutes the sound');
    console.log('  youtube         - Launches the YouTube app');
    console.log('  hdmi1           - Switches to input HDMI 1');
    // Add more commands here if you like
};

const command = process.argv[2];

if (!command) {
    showUsage();
    process.exit();
}

// --- Wake-on-LAN command ---
if (command === 'on') {
    if (!config.tv_mac || config.tv_mac === 'XX:XX:XX:XX:XX:XX') {
        console.error("❌ Error: TV MAC address is not set in 'config.json'. Cannot turn on TV.");
        process.exit(1);
    }
    console.log('⚡ Sending Wake-on-LAN signal...');
    wol.wake(config.tv_mac, { address: config.broadcast_ip }, (err) => {
        if (err) {
            console.error('Error sending Wake-on-LAN signal:', err);
        } else {
            console.log('✅ Signal sent. The TV should turn on shortly.');
        }
    });
    return; // Exit after sending WoL packet
}

// --- Connect to TV for other commands ---
const tv = lgtv({ url: tvUrl, reconnect: false });

tv.on('error', (err) => {
    console.error('❌ Connection error:', err.code);
    console.error("Could not connect to the TV. Make sure the TV is on and the IP in 'config.json' is correct.");
    process.exit(1);
});

tv.on('connect', () => {
    console.log('✅ Connected to LG TV');
    executeCommand(command);
});

// --- Command execution logic ---
const executeCommand = (cmd) => {
    const commands = {
        'off': { path: 'ssap://system/turnOff' },
        'volumeUp': { path: 'ssap://audio/volumeUp' },
        'volumeDown': { path: 'ssap://audio/volumeDown' },
        'mute': { path: 'ssap://audio/setMute', payload: { mute: true } },
        'unmute': { path: 'ssap://audio/setMute', payload: { mute: false } },
        'youtube': { path: 'ssap://system.launcher/launch', payload: { id: 'youtube.leanback.v4' } },
        'hdmi1': { path: 'ssap://tv/switchInput', payload: { inputId: 'HDMI_1' } },
    };

    const commandSpec = commands[cmd];

    if (!commandSpec) {
        console.log(`Unknown command: "${cmd}"`);
        showUsage();
        tv.disconnect();
        return;
    }

    tv.request(commandSpec.path, commandSpec.payload, (err, res) => {
        if (err) {
            console.error(`Error executing command '${cmd}':`, err);
        } else {
            console.log(`✅ Command '${cmd}' executed successfully.`);
        }
        // Disconnect after 500ms to ensure command is processed
        setTimeout(() => tv.disconnect(), 500);
    });
};
