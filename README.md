# Countdown Timer

## Overview

The timer is intended to run locally on a PC and only countdown to 0.  All settings are saved using localStorage.

## Setup

### General settings

Once files are on a local PC, run the `settings.html` file.  This will load with set defaults, these can be adjusted within the code of `settings.html` within the `defaultSettings` functions.  Note: any changes here must be replicated within the `display.html` file to ensure consistency in preload of defaults.

Various changes can be made to the appearance:

- Text colour
- Background colour
- Timer text size

A background image can be loaded, by default the timer will sit within a block of colour, to disable this untick `Show centre block background`.

Other settings include:
- Add a message and adjust message text size
- Show a status line, this indicates the timer is running and if selected for a target time, this will indicate the time it runs until

### Alerts

2 alerts can be set to trigger at different times.  The settings can be adjusted to change background colour and text colour.

### Presets

Presets can be created:

1. Ensure settings are all set correctly
2. Enter a name for the preset
3. Click save preset

To load a preset:

1. Select a preset from the list
2. Click Load

To delete a preset:

1. Select the preset from the list
2. Click Delete

### Reset

If you wish to reset all settings back to the default as stored in `settings.html`, click the `Reset to defaults` button.

## Usage

Once you are ready to use the timer, click `Open display in new tab`.  This will open the countdown timer ready to start.  There are 4 option buttons in the top right of this window:

- `Start` - this starts the countdown
- `Pause` - this holds the timer with the current countdown, when you start again it will start from the time displayed
- `Reset` - this resets the countdown based on the last settings set
- `Fullscreen` - this sets the timer ready to go for a screen display, it does the following:
  1. Sets the screen to fullscreen
  2. Hides the top bar
  3. Hides the cursor after 5 seconds

When running the countdown, you can use the following keyboard shortcuts:

- `Space` - starts and pauses the timer
- `F` - toggles fullscreen mode on or off
- `R` - resets the timer to the last set settings