//From https://github.com/microsoft/terminal/blob/master/doc/cascadia/SettingsSchema.md#profiles
const terminalOptions = [
    {name:"colorScheme",type:"stringlist",promptMsg:"Change the color scheme of the profile(s)"},
    
    {name:"padding",type:"string",promptMsg:"Change the padding of the profile(s)"},
    {name:"snapOnInput",type:"boolean",promptMsg:"Toogle if profile(s) should snap on input"},
    {name:"historySize",type:"int",promptMsg:"Change how many lines of which the profile(s) will save"},
    {name:"scrollbarState",type:"stringlist",promptMsg:"Change the display of the scrollbar"},
    
    {name:"cursorColor",type:"color",promptMsg:"Change the color of the cursor"}, //TODO: Implement color selection support
    {name:"cursorShape",type:"stringlist",promptMsg:"Change the shape of the cursor"},
    
    {name:"useAcrylic",type:"boolean",promptMsg:"Toogle if the profile(s) should use acrylic"},
    {name:"acrylicOpacity",type:"float",promptMsg:"Change the opacity of the acrylic"},
    
    {name:"startingDirectory",type:"string",promptMsg:"Change the path of there the profile(s) should start"},
    {name:"commandline",type:"string",promptMsg:"Change what should be called when the profile(s) is started"},
    
    {name:"guid",type:"string",promptMsg:"Change value"},
    {name:"tabTitle",type:"string",promptMsg:"Change the title of tab"},
    {name:"icon",type:"path",promptMsg:"Change the icon of the profile(s)"},
    {name:"name",type:"string",promptMsg:"Change the name of the profile(s)"},
    
    {name:"fontSize",type:"int",promptMsg:"Change the font-size of the profile(s)"},
    {name:"fontFace",type:"stringlist",promptMsg:"Change the font of the profile(s)"},
    
    {name:"background",type:"color",promptMsg:"Change the background color of the profile(s)"},
    {name:"backgroundImage",type:"path",promptMsg:"Change the background image of the profile(s)"},
    {name:"backgroundImageStrechMode",type:"stringlist",promptMsg:"Change how the background image should strech"},
    {name:"backgroundImageAlignment",type:"stringlist",promptMsg:"Change how the background image is alinged"},
    {name:"backgroundImageOpacity",type:"float",promptMsg:"Change the opacity of the background image"},   
    
    {name:"closeOnExit",type:"boolean",promptMsg:"Toggle if the profile(s) will close when typed \"exit\""}
];

const imageAlignmentValues = [
    "center","left","top", "right", "bottom", "topLeft", "topRight", "bottomLeft", "bottomRight"
]

const imageStretchValues = [
    "none", "fill", "uniform", "uniformToFill"
]

const cursorShapes = [
    "vintage", "bar", "underscore", "filledBox", "emptyBox"
]

const scrollbarStates = [
    "visible", "hidden"
]

module.exports = {
    terminalOptions: terminalOptions,
    imageAlignmentValues: imageAlignmentValues,
    imageStretchValues: imageStretchValues,
    cursorShapes: cursorShapes,
    scrollbarStates:scrollbarStates
}