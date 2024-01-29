@echo off
cd /d "%~dp0"..\
if not exist "node_modules" call npm install

node Lantern.js ExportPals %1
pause
