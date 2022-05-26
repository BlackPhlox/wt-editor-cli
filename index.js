/* MODULES */
const fs = require('fs');
const inquirer = require('inquirer');

const chalk = require('chalk');
const chalkPipe = require('chalk-pipe');
const isCSSColorName = require('is-css-color-name');
const convertCssColorNameToHex = require('convert-css-color-name-to-hex');
const { from } = require('rxjs');
const fontList = require('font-list');
const config = require("app-settings")("config.json");
const fuzzy = require('fuzzy');

inquirer.registerPrompt('chalk-pipe', require('inquirer-chalk-pipe'));
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

/* LOCAL IMPORTS */
const inquirerFileTreeSelection = require('./inquirer-file-tree-selection-prompt-custom');
inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection);

require('./util.js');
const settingsSchema = require('./schema.js');
const imageAlignmentValues = settingsSchema.imageAlignmentValues;
const imageStretchValues = settingsSchema.imageStretchValues;
const scrollbarStates = settingsSchema.scrollbarStates;
const terminalOptions = settingsSchema.terminalOptions;
const cursorShapes = settingsSchema.cursorShapes;

/* SETTINGS */
const jsonPath = config.jsonPath;
const hexcodeReg = /^#([0-9A-F]{3}){1,2}$/i;
const roamingPath = "ms-appdata:///roaming/";
const absImgDir = config.assetPath;

let js = read(jsonPath);

let schemes = js.schemes;

/* Create backup file */

try {
    if (!fs.existsSync(jsonPath+".backup")) {
        overwriteFile(js,jsonPath+".backup");
    } 
} catch(err) {
    console.error(err)
}

/* Main menu */
const commands = [
    {name: "Edit"},
    {name: "Revert"},
    {name: "Save"},
    {name: "Exit"}
];

mainMenuPrompt();

/* Sub-menues */
const editItems = [
    "Back","Settings","Terminals", "Schemes", "Add"
]

function checkConfigSetting(s){
    let setting = config[s];
    if(setting === undefined || setting.length <= 0){
        let def = config.find(pd => pd[s])[s];
        if(def === undefined){
            console.error("Program default not defined");   
            return;         
        }
        return def;
    } else {
        let sett = config[s];
        if(sett === undefined){
            console.error(s + " is not a valid setting"); 
            return;
        }
        return config[s];
    }
}

function newMenu(name){
    clear();
    console.log(colorConfig("questionColor").underline(name));
}

function invalidInput(){
    console.log(colorConfig("errorColor")("Invalid input, try again"));
}

function colorConfig(key){
    return chalk.keyword(checkConfigSetting(key));
}

function changeJSValue(settingName,profileName,then){
    let term;
    if(profileName !== undefined){
        term = js.profiles.list.find(t => t.name === profileName);
    }
    let opt = terminalOptions.find(e => e.name === settingName)    
    console.log(settingName);
    let msg = opt.promptMsg;
    let type = opt.type;
    //console.log(type);
    switch (type) {
        case 'int':
            updateNumber(then,msg,type,term,settingName);
            break;
        case 'float':
            updateNumber(then,msg,type,term,settingName);
            break;
        case 'boolean':
            updateBoolean(then,msg,undefined,term,settingName);
            break;  
        case 'path':
            updatePath(then,msg,term,settingName,roamingPath);
            break;
        case 'string':
            updateString(then,msg,/ */i,"Please enter a valid string",term,settingName);
            break;
        case 'color':
            updateString(then,msg,hexcodeReg,'Please enter a valid color between #000000 & #FFFFFF',term,settingName);
            break;
        case 'stringlist':
            switch (settingName) {
                case 'font':
                    updateStringList(then,msg,
                    listToFuncList(allfonts,(o)=>o.replace(/\"/g, '')),
                    term,settingName);
                    break;
                case 'colorScheme':
                    updateStringList(then,msg,
                    listToFuncList(schemes.map(s => s.name),(cs)=>cs),
                    term,settingName);
                    break;
                case 'backgroundImageAlignment':
                    updateStringList(then,msg,
                    listToFuncList(imageAlignmentValues,(cs)=>cs),
                    term,settingName);
                    break;
                case 'backgroundImageStrechMode':
                    updateStringList(then,msg,
                    listToFuncList(imageStretchValues,(cs)=>cs),
                    term,settingName);
                    break;
                case 'cursorShape':
                    updateStringList(then,msg,
                    listToFuncList(cursorShapes,(cs)=>cs),
                    term,settingName);
                    break;
                case 'scrollbarState':
                    updateStringList(then,msg,
                    listToFuncList(scrollbarStates,(cs)=>cs),
                    term,settingName);
                    break;
                default:
                    console.log("Invalid stringlist setting");
                    break;
            }
            break;
        default:
            console.log("Invalid setting type");
            break;
    }
    return;
}


let allfonts;

fontList.getFonts()
  .then(fonts => {
    allfonts = fonts;
  })
  .catch(err => {
    console.log(err)
  })

function listToFuncList(list,f){
    return searchList = (answers, input) => {
        input = input || '';
        return new Promise((resolve) => {
            setTimeout(() => {
            let fuzzyResult = fuzzy.filter(input, list);
            resolve(
                fuzzyResult.map((el) => {
                    return f(el.original);
                })
            );
            });
        });
    }
}

function truncateString(str){
    if(str.length > 30){
        let first = str.substring(0, 5);
        let mid = "[...]"
        let end = str.substring(str.length - 20, str.length);
        return first + mid + end;
    } else {
        return str;
    }
}


// UPDATE FUNCTIONS //

function updateStringList(then,msg,funcList,term,settingName){
    inquirer
        .prompt([
            {
                type: 'autocomplete',
                name: 'stringListChange',
                message: msg,
                source: funcList
            }
        ]).then(answers => {
        console.log(answers);
        setProfileSetting(js,jsonPath,term,settingName,answers.stringListChange);  
        setTimeout(() => {
            then();
        }, 1000);
    })
}

function updateString(then,msg,regex,regexErrorMsg,term,settingName){
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'stringChange',
                message: msg,
                validate: (value) => {
                    let pass = value.match(regex);
                    if (pass) {
                        return true;
                    }
                    return regexErrorMsg;
                },
                default: term?term[settingName]:""
            }
        ]).then(answers => {
        console.log(answers);
        setProfileSetting(js,jsonPath,term,settingName,answers.stringChange);  
        setTimeout(() => {
            then();
        }, 1000);
    })
}

function updateBoolean(then,msg,numType,term,settingName){
    inquirer
    .prompt([
        {
        type: 'confirm',
        name: 'changeBoolean',
        message: msg + (term?` (currently: ${term[settingName]})`:"")
        }
    ])
    .then(answers => {
        setProfileSetting(js,jsonPath,term,settingName,answers.changeBoolean);  
        setTimeout(() => {
            then();
        }, 1000);
    })
}

function updateNumber(then,msg,numType,term,settingName){
    let p;
    if(term !== undefined){
        p = inquirer
        .prompt([
            {
                type: 'number',
                name: 'numberChange',
                message: msg,
                default: term[settingName]
            }
        ]);
    } else {
        p = inquirer
        .prompt([
            {
                type: 'number',
                name: 'numberChange',
                message: msg,
            }
        ]);
    }
    p.then(answers => {
        if(isInt(answers.numberChange) && numType === 'int'){
            //console.log("is Int");
            setProfileSetting(js,jsonPath,term,settingName,answers.numberChange);  
            setTimeout(() => {
                then();
            }, 1000);
        } else if(isFloat(answers.numberChange) && numType === 'float'){ 
            //console.log("is Float");
            setProfileSetting(js,jsonPath,term,settingName,answers.numberChange);  
            setTimeout(() => {
                then();
            }, 1000);
        } else {
            console.log("Invalid input, it has to be a/an " + numType);
            updateNumber(numType,term[settingName]); //Tail recursive call
        }
    });   
}

function isInt(n) {
    return n % 1 === 0;
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

//profileName can be undefined, which would result in every background image being changed
function updatePath(then,msg,term,settingName){
    inquirer
    .prompt([
        {
        type: 'file-tree-selection',
        name: 'file',
        root: absImgDir,
        message: msg,
        profile: term,
        settingName: settingName
        }
    ])
    .then(answers => { 
        setProfileSetting(js,jsonPath,term,settingName,answers.file);
        setTimeout(() => {
            then();
        }, 1000);
    });   
}

function setSchemeValue(key,value){
    js.schemes[0][key] = value;
    console.log(js.schemes[0][key]);
}

// MENU //

function mainMenuPrompt(){
    newMenu("Main Menu:");
    inquirer
    .prompt([
        {
            type: 'rawlist',
            name: 'terminal',
            message: `What do you want to do?\n`,
            choices: commands
        }
    ])
    .then(answers => {
        switch(answers.terminal){
            case 'Edit'  : askEdit()      ; break;
            case 'Revert': revertPrompt() ; break;
            case 'Save'  : savePrompt()   ; break;
            case 'Exit'  : clear()        ; break;
            default :
                invalidInput();
                mainMenuPrompt();
                break;
        }
    })
}

// MENU PROMPTS //

function revertPrompt(){
    newMenu("Reverting");
    inquirer
    .prompt([
        {
            type: 'confirm',
            name: 'toExit',
            message: 'Are you sure you want to load backup? Any current changes will be deleted',
            default: false
        }
    ]).then(answers => {
        if(answers.toExit){
            js = revertToBackup(jsonPath);
            overwriteFile(js,jsonPath);
            mainMenuPrompt();
        } else {
            mainMenuPrompt();
        }
    })
}

function savePrompt(){
    newMenu("Exiting");
    inquirer
    .prompt([
        {
            type: 'confirm',
            name: 'toSave',
            message: 'Are you sure you want save to backup? Previous backup will be overwritten',
            default: false
        }
    ]).then(answers => {
        if(answers.toSave){    
            overwriteBackup(jsonPath);
            mainMenuPrompt();
        } else {
            mainMenuPrompt();
        }
    })
}

// SUB-MENU PROMPTS //

function askEdit(){
    newMenu("Select type to edit");
    inquirer
    .prompt([
        {
            type: 'rawlist',
            name: 'editQuestion',
            message: `What do you want to edit?\n`,
            choices: editItems.filter(i => !(i == "Add"))
        }
    ])
    .then(answers => {
        if(answers.editQuestion == 'Settings'){
            console.log("This is still WIP");
            setTimeout(() => {
                askEdit();
            }, 1000);
            //selectSettings();
        } else if(answers.editQuestion == 'Terminals'){
            selectTerminal();
        } else if (answers.editQuestion == 'Schemes'){
            console.log("This is still WIP");
            setTimeout(() => {
                askEdit();
            }, 1000);
            //selectSchemes();
        } else if (answers.editQuestion == 'Back'){
            mainMenuPrompt();
        } else {
            invalidInput();
            askEdit();
        }
    })
}

// SETTINGS //

function selectSettings(){
    newMenu("Selecting settings");
    let selectSettings = Object.keys(js.globals);
    if(!selectSettings.some(e => e === "Back")){
        selectSettings.splice(selectSettings.length,0,"Back");
    }
    inquirer
    .prompt([
        {
            type: 'rawlist',
            name: 'editQuestion',
            message: `What settings do you want to edit?\n`,
            choices: selectSettings
        }
    ])
    .then(answers => {
        if (answers.editQuestion == 'Back'){
            askEdit();
        }
    })
}

// TERMINALS //

function selectTerminal(){
    newMenu("Select terminal to edit");
    let editTerminalOptionList = js.profiles.list;
    if(!editTerminalOptionList.some(e => e === "Add" || e === "Back" || e === "Edit all")){
        editTerminalOptionList.splice(0,0,"Add");
        editTerminalOptionList.splice(1,0,"Edit all");
        editTerminalOptionList.splice(editTerminalOptionList.length,0,"Back");
    }
    inquirer
    .prompt([
        {
            type: 'rawlist',
            name: 'editQuestion',
            message: `What terminal do you want to edit?\n`,
            choices: editTerminalOptionList
        }
    ])
    .then(answers => {           
        if (answers.editQuestion == 'Add'){
            addTerminal();
        } else if (answers.editQuestion == 'Back'){
            askEdit();
        } else if(answers.editQuestion == 'Edit all'){
            editAllTerm();
        } else {
            if(js.profiles.list.some(p => p.name == answers.editQuestion)){
                editTerminal(js.profiles.list.filter(p => p.name == answers.editQuestion)[0]);//Not handling multiple with same name
            } else {
                invalidInput();
                selectTerminal();
            }            
        }
    })
}

function editAllTerm(){
    newMenu("Editing all terminals");
    let termOptionList = terminalOptions.map(to => to.name);
    if(!termOptionList.some(e => e === "Back")){
        termOptionList.splice(termOptionList.length,0,"Back");
    }
    inquirer
    .prompt([
        {
            type: 'rawlist',
            name: 'editAllTerminal',
            message: `What part of the all the terminals do you want to edit?\n`,
            choices: termOptionList
        }
    ])
    .then(answers => {
        if (answers.editAllTerminal == 'Back'){
            selectTerminal();
        } else {
            changeJSValue(answers.editAllTerminal, undefined, () => selectTerminal(), roamingPath);       
        }
    })
}

function truncateString(str){
    if(str.length > 30){
        let first = str.substring(0, 5);
        let mid = "[...]"
        let end = str.substring(str.length - 20, str.length);
        return first + mid + end;
    } else {
        return str;
    }
}

function editTerminal(terminal){
    newMenu("Editing terminal");
    //console.log(terminal);    
    let terminalOptionList = Object.keys(terminal).map(k => k + " " + truncateString(terminal[k]));
    
    if(!terminalOptionList.some(e => e === "Back")){
        terminalOptionList.splice(terminalOptionList.length,0,"Back");
    }
    
    inquirer
    .prompt([
        {
            type: 'rawlist',
            name: 'editTerminal',
            message: `What part of the terminal do you want to edit?\n`,
            choices: terminalOptionList
        }
    ])
    .then(answers => {
        let processedAnswer = answers.editTerminal.split(" ")[0];       
        if (processedAnswer == 'Back'){
            selectTerminal();
        } else if (terminalOptionList.some(e => e === answers.editTerminal)){
            changeJSValue(processedAnswer,terminal.name,()=>editTerminal(terminal),roamingPath);
        } else {
            invalidInput();
            editTerminal(terminal);          
        }
    })
}

// SCHEMES //

function selectSchemes(){
    newMenu("Select scheme to edit");
    let schemeList = js.schemes;
    if(!schemeList.some(e => e === "Add" || e === "Back")){
        schemeList.splice(0,0,"Add");
        schemeList.splice(schemeList.length,0,"Back");
    }
    inquirer
    .prompt([
        {
            type: 'rawlist',
            name: 'editQuestion',
            message: `What scheme do you want to edit?\n`,
            choices: schemeList
        }
    ])
    .then(answers => {       
        if (answers.editQuestion == 'Add'){
            addScheme();
        } else if (answers.editQuestion == 'Back'){
            askEdit();
        } else {
            if(js.profiles.list.some(p => p.name == answers.editQuestion)){
                editSchemes(js.profiles.list.filter(p => p.name == answers.editQuestion));//Not handling multiple with same name
            } else {
                invalidInput();
                selectTerminal();
            }            
        }
    })
}

function editSchemes(){
    newMenu("Edit schemes:");
    inquirer
    .prompt([
        {
            type: 'rawlist',
            name: 'scheme',
            message: `What scheme do you want to edit?\n`,
            choices: js.schemes.map(sch => sch.name)
        }
    ])
    .then(answers => {
        //console.log(JSON.stringify(answers.scheme, null, '  '));
 
        let schv = schemes.filter((sch) => sch.name == answers.scheme)[0];
        inquirer
        .prompt([
            {
                type: 'rawlist',
                name: 'schemeValue',
                message: `What scheme do you want to edit?\n`,
                choices: Object.keys(schv)
            }
        ])
        .then(answers => {
            //console.log(JSON.stringify(answers, null, '  '));
            //console.log(answers.schemeValue);
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'new_color',
                    message: "What's the new color",
                    default: schv[answers.schemeValue],
                    transformer: function(color) {
                        return chalkPipe(color)(color);
                    }
                }
            ])
            .then(answers => {
                if(isCSSColorName(answers.new_color)){                    
                    setSchemeValue(answers.schemeValue,convertCssColorNameToHex(answers.new_color));
                } else if (hexcodeReg.match(answers.new_color) != null){
                    setSchemeValue(answers.schemeValue,answers.new_color)
                } 
                
                console.log(JSON.stringify(answers, null, '  '));
            })
        })
    })
}

function addTerminal(){
    newMenu("Adding terminal");
}

function addScheme(){
    newMenu("Adding scheme");
}



/*
function startUpdateLoop(){
    let updateRate = 1000;
    setInterval(() => {
        console.log("Hello world " + getHours(updateRate));
        updateRate += 1000*60*60;
    }, updateRate);
}

function getHours(s){
    return (s % 1000*60*60);
}
*/

