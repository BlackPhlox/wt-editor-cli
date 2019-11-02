# wt-editor-cli
![wt-editor-cli-showcase](https://user-images.githubusercontent.com/25123512/68074479-a74b5100-fd9b-11e9-8aad-cb85f580aad6.gif)
A command line editor for Windows Terminal settings
# Prerequisites
  - Running Windows 7 or later
  - Have the latest version of Windows Terminal (Preview) installed
  - Have Node.js 12 installed or later
  - Have npm (Comes with Node.js)
# Setup
  - Clone this repo ```git clone https://github.com/BlackPhlox/wt-editor-cli.git```
  - (Important) If you already have configured your `profiles.json`, I highly recommend you backup your file, just in case. The file can be found here: `%appdata%\..\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\`
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
