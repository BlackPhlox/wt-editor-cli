const fs = require('fs');

/* UTIL FUCTIONS */

clear = function(){
    process.stdout.write('\u001b[2J\u001b[0;0H');
}

read = function(path){
    let rawdata = fs.readFileSync(path);
    return JSON.parse(rawdata);
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
    js.profiles = getAllObjects(js.profiles);
    write(js,path);
}

setProfileSetting = function(js,path,term,settingName,value){
    if(settingName === undefined || value === undefined) {
        console.error("No setting or value specified");
        return;
    }
    
    if(term === undefined){
        js.profiles.forEach(p => {
            p[settingName] = value;
        })
    } else {
        js.profiles.find(p => p.name === term.name)[settingName] = value;
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