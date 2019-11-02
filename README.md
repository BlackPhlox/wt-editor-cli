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
  - Go into the folder `cd wt-editor-cli`
  - (Important) If you already have configured your `profiles.json`, I highly recommend you backup your file, just in case.
  - (Important) Open `config.json` and change the path of `jsonPath` to where your `profiles.json` is located (should only need to change `thelu` to your username) `assetPath` should also be changed to your path of choice (used for path-related settings)
  - Run `npm install`
  - Followed by `npm start` or `node index.js`
  
  Recommended extra step
  - Run the following command to set an enviroment variable to call `wte` in any directory: `setx wte "node "%cd%/index.js""`
  - If you are running using the Linux-Subsystem you can add `alias runbat='cmd.exe /c wte'` in your `~/.bashrc` file.

# Contribution

Any contribution is appreciated, their are no formalities, just create a pull request.

### Creating Pull Requests
  Push your commit to get it back up to your fork: git push origin HEAD
  Visit Github, click handy “Pull request” button that it will make upon noticing your new branch.