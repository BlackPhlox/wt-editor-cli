@echo off

echo 1. Generates or overwrites the current config paths
setlocal ENABLEDELAYEDEXPANSION
set word=/
set js=%appdata%\..\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\profiles.json
set assets=%appdata%\..\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\RoamingState
set js=%js:\=!word!%
set assets=%assets:\=!word!%
@echo { > "%~dp0config.json"
@echo     "jsonPath":"%js%", >> "%~dp0config.json"
@echo     "assetPath":"%assets%", >> "%~dp0config.json"
@echo     "questionColor":"lightgray", >> "%~dp0config.json"
@echo     "errorColor":"red" >> "%~dp0config.json"
@echo } >> "%~dp0config.json"

echo.
echo SUCCESS: Path was configured.
echo.

echo 2. Set wte as an environment variable

echo $desired_entry = Get-Location;$old_path = [Environment]::GetEnvironmentVariable('path', 'machine');$old_path_entry_list = ($old_path).split(";");$new_path_entry_list = new-object system.collections.arraylist;foreach($old_path_entry in $old_path_entry_list){if($old_path_entry -eq $desired_entry){}else{[void]$new_path_entry_list.Add($old_path_entry)}}[void]$new_path_entry_list.Add($desired_entry);$new_path = $new_path_entry_list -Join ";";[Environment]::SetEnvironmentVariable('path', $new_path,'Machine');> "%~dp0envSetup01.ps1"
powershell -command "Start-Process PowerShell -Verb RunAs \""-Command `\""cd '%cd%'; & './envSetup01.ps1';`\""\"""
timeout /t 02
del "envSetup01.ps1"
echo.

echo 3. Installing libraries 
echo.
cmd /C "npm install"

echo SUCCESS: Libraries was installed.
echo.

echo 4. Create batfile
echo.
echo ^@echo off ^& cmd /C "cd %cd% & node index.js" > "wte.bat"

echo Complete! Type "wte" in you terminal to run the application
pause
