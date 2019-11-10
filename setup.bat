@echo off

echo 1. Generates or overwrites the current config paths
setlocal ENABLEDELAYEDEXPANSION
set word=/
set js=%appdata%\..\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\profiles.json
set assets=%appdata%\..\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\RoamingState
set js=%js:\=!word!%
set assets=%assets:\=!word!%
echo {"jsonPath":"%js%","assetPath":"%assets%"} > "%~dp0config.json"

echo.
echo SUCCESS: Path was configured.
echo.

echo 2. Set wte as an environment variable
setx /M wte "node %~dp0index.js"
echo.

echo 3. Installing libraries 
echo.
cmd /C "npm install"

echo SUCCESS: Libraries was installed.
echo.
pause
