# webaudio + ws2812 + webusb demo

This is a basic demo of controlling a matrix of ws2812 addressable LEDs via WebUSB.

It doesn't end here, what shows up on the matrix is a very basic audio visualization using WebAudio.

## Hardware used

1. WS2812 addressable LEDs
2. Arduino Leonardo

## How to run the demo

1. Open `demos/console/sketch/sketch.io` in Arduino SDK.
2. You'll need to upload the sketch to your board (make sure your board is connected over USB)
3. Run a webserver in the root of this repo (hint: `python -m SimpleHTTPServer`)
4. Head over to `https://localhost:8000/console/index.html` in Google Chrome and watch things glow.
5. Feel free to tweak anything in these steps based on your thirst for adventure.

**TIP**: You can get the audio input from mic but that's generally not as much fun. Either you can change the audio input code a little to load your audio directly, or use a loopback software to route your audio out to a mic device and use the mic device as a input for WebAudio analyser.
