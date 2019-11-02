# wt-editor-cli
![wt-editor-cli-showcase](https://user-images.githubusercontent.com/25123512/68074479-a74b5100-fd9b-11e9-8aad-cb85f580aad6.gif)
A command line editor for Windows Terminal settings
# Prerequisites
  - Running Windows 7 or later
  - Have the latest version of Windows Terminal (Preview) installed
# Setup
  - Clone this repo ```git clone https://github.com/BlackPhlox/wt-editor-cli.git```
  - Go into the folder `cd wt-editor-cli`
  - (Important) Open `config.json` and change the path of `jsonPath` to where your profiles.json is located (should only need to change `thelu` to your username) `assetPath` should also be changed to your path of choice (used for path-related settings)
  - Run `npm install`
  - Followed by `npm start` or `node index.js`
  
  Recommended extra step
  - Run the following command to set an enviroment variable to call in any directory: `setx wte "node C:\Users\thelu\Repos\wt-editor-cli\index.js"`
