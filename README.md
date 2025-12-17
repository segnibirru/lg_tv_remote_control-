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
