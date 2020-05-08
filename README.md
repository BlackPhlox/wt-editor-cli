# wt-editor-cli
## Statuses



| Build | ![release](https://github.com/BlackPhlox/wt-editor-cli/workflows/release/badge.svg) |
|-------|---------|
| GitHub | [![GitHub version](https://badge.fury.io/gh/BlackPhlox%2Fwt-editor-cli.svg)](https://badge.fury.io/gh/BlackPhlox%2Fwt-editor-cli) |
| NPM | [![npm version](https://badge.fury.io/js/wt-editor-cli.svg)](https://badge.fury.io/js/wt-editor-cli) |
| Twitter     | ![Twitter Follow](https://img.shields.io/twitter/follow/darkphlox?style=social)       |

![wt-editor-cli-showcase](https://user-images.githubusercontent.com/25123512/68077919-ba2a4980-fdcc-11e9-879f-6e1fecb6bb20.gif)
A command line editor for Windows Terminal settings

# Prerequisites
  - Running Windows 7 or later
  - Have the latest version of Windows Terminal (Preview) installed
  - Have Node.js 12 installed or later
  - Have npm (Comes with Node.js)
# Setup
  - Clone this repo ```git clone https://github.com/BlackPhlox/wt-editor-cli.git``` or<br> using ```npm install -g wt-editor-cli ```
  - (Important) If you already have configured your `settings.json`, I highly recommend you backup your file, just in case. The file can be found here: `%appdata%\..\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\`
  - Go into the folder `cd wt-editor-cli`
  - Run `setup.bat`
  - Run `wte`
  
  Additionally step
  - If you are running using the Linux-Subsystem you can add `alias wte='cmd.exe /c wte'` in your `~/.bashrc` file.

# Contribution

Any contribution is appreciated, their are no formalities, just create a pull request.

### Creating Pull Requests
  Push your commit to get it back up to your fork: git push origin HEAD
  Visit Github, click handy “Pull request” button that it will make upon noticing your new branch.
