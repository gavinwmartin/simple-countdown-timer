# Countdown Timer Companion Module

This module targets the simple countdown timer display and exposes actions for fullscreen, reset, pause, stop, and start. The countdown itself still runs as static HTML; the module only requires the optional `control-server.js` from the project root when you want to enable remote control.

## Configuration

1. Run the countdown timer with the control server (`npm start`) so that the API is reachable on the configured host and port (defaults to port 3000). Open `display.html` with `?remote=1` (or after storing that flag via a prior visit) so the display listens for Companion control.
2. In Companion, add this module and configure:
   - **Host**: Address of the machine running the control server.
   - **Port**: Port number for the control server (default `3000`).
   - **Use HTTPS**: Enable if the control server is published over HTTPS (otherwise HTTP is used).

## Actions

- **Start Countdown**
- **Pause Countdown**
- **Reset Countdown**
- **Stop Countdown**
- **Toggle Fullscreen**

Each action issues an HTTP POST to `/api/action` on the control server, which then broadcasts the command to any open display clients via WebSocket.
