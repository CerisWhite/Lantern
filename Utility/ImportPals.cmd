@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"\..\

REM Get directory of the dragged file
set "inputPath=%~1"
set "dirPath=%~dp1"

REM Run the import function of your script
node Lantern.js ImportPals "%inputPath%" "!dirPath!\new.Level.sav.json"
echo Import complete!
pause
