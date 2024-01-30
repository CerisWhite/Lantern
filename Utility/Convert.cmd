@echo off
cd /d "%~dp0"..\
if not exist "node_modules" call npm install

node Lantern.js Convert %1
pause
