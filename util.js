const fs = require('fs');

/* UTIL FUCTIONS */

clear = function(){
    process.stdout.write('\u001b[2J\u001b[0;0H');
}

read = function(path){
    try{
        let rawdata = fs.readFileSync(path);
        return JSON.parse(rawdata);
    } catch(err){
        console.error("Parse error: No settings.json or config.json found, if there is a config.json file, the path to settings.json might be incorrect, else run setup.bat again");
        throw err;
    }
}

write = function(data,filename){
    let sJson = JSON.stringify(data,null,4);
    fs.writeFileSync(filename, sJson,{encoding:'utf8',flag:'w'});
}

revertToBackup = function(path){
    console.log("Reading backup into memory");
    return read(path+".backup");
}

overwriteBackup = function(path){
    fs.copyFile(path, path+".backup", (err) => {
        if (err) throw err;
    });
}

overwriteFile = function(js,path){
    js.profiles.list = getAllObjects(js.profiles.list);
    write(js,path);
}

setProfileSetting = function(js,path,term,settingName,value){
    if(settingName === undefined || value === undefined) {
        console.error("No setting or value specified");
        return;
    }
    
    if(term === undefined){
        js.profiles.list.forEach(p => {
            p[settingName] = value;
        })
    } else {
        js.profiles.list.find(p => p.name === term.name)[settingName] = value;
    }
    overwriteFile(js,path);
}

getAllObjects = function(list){
    return list.filter(p => typeof p === 'object')
}

module.exports = {
    getAllObjects,
    setProfileSetting,
    overwriteFile,
    revertToBackup,
    write,
    read,
    clear
}