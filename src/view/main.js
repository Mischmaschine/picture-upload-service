const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');

function createWindow() {
    let mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    Menu.setApplicationMenu(null);

    mainWindow.webContents.openDevTools();

    mainWindow.loadFile('index.html');

    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.send('did-finish-load');
    });

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

ipcMain.handle('fetch', async (_, url, options) => {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
});

app.on('ready', function () {
    createWindow();

    console.log('app.on(ready)');
});

ipcMain.on('upload-success', (event, data) => {
    console.log(data);
});