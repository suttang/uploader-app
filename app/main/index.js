const electron = require('electron');
// Module to control application life.
const {app} = electron;
// Module to create native browser window.
const {BrowserWindow} = electron;
// Menu
const createMenu = require('./menu');
const {Menu} = electron;
//
const {client} = require('electron-connect');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  // Create the browser window.
  // win = new BrowserWindow({width: 400, height: 300});
  win = new BrowserWindow({
    width: 600,
    height: 400,
    titleBarStyle: 'hidden-inset',
    backgroundColor: '#f3f3f3',
    title: 'box',
    show: true,
  });


  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/../renderer/index.html`);

  // Open the DevTools.
  win.webContents.openDevTools();

  const menu = Menu.buildFromTemplate(createMenu());
  Menu.setApplicationMenu(menu);


  // Connect to server process
  client.create(win);

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  win.on('focus', () => {
    console.log("ON FOCUS");
  });

  win.on('blur', () => {
    console.log("ON BLUR");
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
