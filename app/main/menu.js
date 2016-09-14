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
    {
      label: 'Reload',
      accelerator: 'CmdOrCtrl+R',
      click (item, focusedWindow) {

      }
    },
  ]
};

menu.push(menuContentEdit);
menu.push(menuContentView);
if (process.platform === 'darwin') {
  menu.unshift(menuContentApp);
}

module.exports = function createMenu() {
  return menu;
};
