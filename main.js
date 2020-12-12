const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const data = require('./data');

let tray = null;

app.on('ready', () => {
    console.log('Aplicação Iniciada!');
    let mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            nodeIntegration: true
        }
    });

    tray = new Tray(__dirname + '/app/img/icon.png');

    let trayMenu = Menu.buildFromTemplate([
        {label: 'Cursos'},
        {label: '', type: 'separator'},
        {label: 'JavaScript', type: 'radio'},
        {label: 'Java', type: 'radio'},
        {label: 'Photoshop', type: 'radio'}
    ]);

    tray.setContextMenu(trayMenu);

    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

app.on('window-all-closed', () => {
    app.quit();
});

let sobreWindow = null;
ipcMain.on('abrir-janela-sobre', () => {
    if (sobreWindow == null) {
        sobreWindow = new BrowserWindow({
            width: 300,
            height: 250,
            alwaysOnTop: true,
            webPreferences: {
                nodeIntegration: true
            },
            frame: false

        });
        sobreWindow.on('closed', () => {
            sobreWindow = null;
        })
    }
    sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`);
});

ipcMain.on('fechar-janela-sobre', () => {
    sobreWindow.close();
});

ipcMain.on('curso-parado', (event, curso, tempoEstudado) => {
    data.salvaDados(curso, tempoEstudado);
});