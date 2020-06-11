# What is wt-editor-cli?
A command line editor for realtime updating of Windows Terminal settings

![wt-editor-cli-showcase](https://user-images.githubusercontent.com/25123512/68077919-ba2a4980-fdcc-11e9-879f-6e1fecb6bb20.gif)

|Info| |
|-------|---------|
| Build | ![release](https://github.com/BlackPhlox/wt-editor-cli/workflows/release/badge.svg) |
| GitHub | [![GitHub version](https://badge.fury.io/gh/BlackPhlox%2Fwt-editor-cli.svg)](https://badge.fury.io/gh/BlackPhlox%2Fwt-editor-cli) |
| NPM | [![npm version](https://badge.fury.io/js/wt-editor-cli.svg)](https://badge.fury.io/js/wt-editor-cli) |
| Downloads |![npm](https://img.shields.io/npm/dt/wt-editor-cli?label=NPM%20Download)|
| Twitter     | [![Twitter Follow](https://img.shields.io/twitter/follow/darkphlox?style=social)](https://twitter.com/darkphlox)      |

## Related repositories
  - [wt-editor-gui](https://github.com/BlackPhlox/wt-editor-gui) - A graphical user interface version of wt-editor-cli
  - [Windows Terminal Editor (WTE)](https://github.com/BlackPhlox/wte) - A collection of both wt-editor-cli & wt-editor-gui written in rust
  - [nateshmbhat's windows-terminal-tweaker](https://github.com/nateshmbhat/windows-terminal-tweaker) - A electron-based windows terminal editor

# Prerequisites
  - Running Windows 1903 (build >= 10.0.18362.0) or later
  - Have the latest version of Windows Terminal (Preview) installed
  - Have Node.js 12 installed or later
  - Have npm (Comes with Node.js)
# Setup
  - Clone this repo ```git clone https://github.com/BlackPhlox/wt-editor-cli.git``` or<br> using ```npm install -g wt-editor-cli ```
  - (Important) If you already have configured your `settings.json`, I highly recommend you backup your file, just in case. The file can be found here: `%appdata%\..\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\`
  - Go into the downloaded folder `cd wt-editor-cli` if via git and `%appdata%\npm\node_modules\wt-editor-cli` if via npm
  - Run `setup.bat`
  - Run `wte`
  
  Additionally step
  - If you are running using the [Linux-Subsystem](https://docs.microsoft.com/en-us/windows/wsl/install-win10) you can add `alias wte='cmd.exe /c wte'` in your `~/.bashrc` file.

# Configuration
When `setup.bat` has run, a _config.json_ file has been generated. There is currently only 3 properties you can change: assetPath(cli-explorer-selector's default path), questionColor and errorColor (Both is parsed using [chalk](https://www.npmjs.com/package/chalk)): 
 ```json
 { 
    "jsonPath":"(Your appdata path)/../Local/Packages/Microsoft.WindowsTerminal_8wekyb3d8bbwe/LocalState/settings.json", 
    "assetPath":"(Your appdata path)/../Local/Packages/Microsoft.WindowsTerminal_8wekyb3d8bbwe/RoamingState", 
    "questionColor":"lightgray", 
    "errorColor":"red" 
} 

```

# Contribution

Any contribution is appreciated, their are no formalities, just create a pull request.

### Creating Pull Requests
  Push your commit to get it back up to your fork: git push origin HEAD
  Visit Github, click handy “Pull request” button that it will make upon noticing your new branch.
