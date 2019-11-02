REM Generates or overwrites the current config paths
setlocal ENABLEDELAYEDEXPANSION
set word=/
set js=%appdata%\..\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\profiles.json
set assets=%appdata%\..\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\RoamingState
set js=%js:\=!word!%
set assets=%assets:\=!word!%
echo.{"jsonPath":"%js%","assetPath":"%assets%"} >"%cd%\config.json"

