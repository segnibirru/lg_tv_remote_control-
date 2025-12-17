# LG TV Remote CLI

A simple but effective command-line remote control for your LG WebOS TV. This Node.js script allows you to control your TV's basic functions directly from your terminal.

It's lightweight, easy to configure, and perfect for home automation scripts, custom hotkeys, or just impressing your friends with your geeky setup.

## Features

- **Power On/Off:** Turn your TV on with Wake-on-LAN and turn it off with a simple command.
- **Volume Control:** Adjust the volume up or down, and mute/unmute.
- **App Launcher:** Quickly launch apps like YouTube.
- **Input Switching:** Change to different HDMI inputs.
- **Easy Configuration:** A simple `config.json` file to store your TV's details.

## Prerequisites

- [Node.js](https://nodejs.org/) (v12 or higher recommended)
- An LG Smart TV with WebOS
- Your TV connected to the same network as your computer

## Installation

1.  **Clone the repository (or download the files):**
    ```bash
    git clone https://github.com/segnibirru/lg_tv_remote_control-.git
    cd lg-tv-remote-cli
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure your TV:**
    - Copy the example config file:
      ```bash
      cp config.json.example config.json
      ```
    - Open `config.json` and fill in your TV's IP address and MAC address. You can usually find these in your TV's network settings or on your router's admin page.

4.  **Pair with your TV:**
    The first time you run a command, your TV will display a pairing request. You must accept this request on the TV screen to authorize the script to control it.

## Usage

Run the script from your terminal using `node remote.js` followed by a command.

### Available Commands

| Command      | Description                      |
|--------------|----------------------------------|
| `on`         | Turns the TV on.                 |
| `off`        | Turns the TV off.                |
| `volumeUp`   | Increases the volume.            |
| `volumeDown` | Decreases the volume.            |
| `mute`       | Mutes the audio.                 |
| `unmute`     | Unmutes the audio.               |
| `youtube`    | Launches the YouTube app.        |
| `hdmi1`      | Switches the input to HDMI 1.    |

### Examples

```bash
# Turn the TV on
node remote.js on

# Increase the volume
node remote.js volumeUp

# Launch YouTube
node remote.js youtube
```

## License

This project is licensed under the MIT License.
