***React Native Music Player - Stream and Enjoy***

This is a music streaming application built with React Native and React Native Track Player, offering a seamless music experience on both Android and iOS devices.

**Features:**

- **Network Streaming**: Stream MP3 audio files directly from online sources.
- **Playback Controls**: Play, pause, skip tracks, adjust volume, and seek within tracks for precise control.
- **Queue Management**: Add, remove, and reorder songs in your listening queue for a customized experience.
- **Lyrics Display**: Immerse yourself in the music with integrated lyrics display (implementation details will depend on your approach).
- **Background Playback**: Keep the music flowing even when the app is minimized or in the background.

Technologies:

**React Native**: Cross-platform development framework for mobile apps.
**React Native Track Player**: Robust audio player library for background playback and media controls.
**Fastlane**: For automating the build and release of your application.
**Redux and Redux-persist**: For managing store
**lottie-react-native**: For handling application logo

Installation:

1. Install dependencies: `yarn install`
2. Install pod files: `cd ios && pod install`

**For iOS**

Run the project using Xcode:
- open the xcode workspace file in the xcode
- run the project with xcode and run the `yarn start` command to start your server.

**For Android**

- check if a device is connected or an emulator is running by running the command:
`adb devices`
- if so, run the command `yarn android`


**NOTE**
This project was last modified about 3 years ago, and needs to be refactored and updated.

