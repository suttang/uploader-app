const { app, shell, dialog } = require('electron');
const appName = app.getName();

const menu = [];
const menuContentApp = {
  label: appName,
  submenu: [
    { role: 'about' },
    { type: 'separator' },
    { role: 'services',   submenu: [] },
    { type: 'separator' },
    { role: 'hide' },
    { role: 'hideothers' },
    { role: 'unhide' },
    { type: 'separator' },
    { role: 'quit' },
  ]
};

const menuContentEdit = {
  label: 'Edit',
  submenu: [
    { role: 'undo' },
    { role: 'redo' },
    { type: 'separator' },
    { role: 'cut' },
    { role: 'copy' },
    { role: 'paste' },
    { role: 'pasteandmatchstyle' },
    { role: 'delete' },
    { role: 'selectall' },
  ]
};

const menuContentView = {
  label: 'View',
  submenu: [
    { role: 'togglefullscreen' },
    {
      label: 'Developer',
      submenu: [
        {
          label: 'Toggle Developer Tools',
          accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click(item, focusedWindow) {
            if (focusedWindow) {
              focusedWindow.webContents.toggleDevTools();
            }
          }
        },
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click (item, focusedWindow) {
            if (focusedWindow) {
              focusedWindow.rpc.emit('reload');
            }
          }
        },
      ]
    }
  ]
};

const menuContentWindow = {
  role: 'window',
  submenu: [
    { role: 'minimize' },
    { type: 'separator' },
    { role: 'zoom' },
    { type: 'separator' },
    { role: 'front' }
  ]
};

const menuContentHelp = {
  role: 'help',
  submenu: [
    {
      label: `${appName} Website`,
      click() {
        shell.openExternal('https://hyperterm.now.sh');
      }
    },
  ]
}

menu.push(menuContentEdit);
menu.push(menuContentView);
menu.push(menuContentWindow);
menu.push(menuContentHelp);
if (process.platform === 'darwin') {
  menu.unshift(menuContentApp);
}

module.exports = function createMenu() {
  return menu;
};
