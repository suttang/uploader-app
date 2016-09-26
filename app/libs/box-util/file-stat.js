const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const stat = Promise.promisify(fs.stat);

function fileStat(filepath) {
  return stat(filepath).then(stats => {
    const filesize = stats.size;
    const filename = path.basename(filepath);
    const filetype = stats.isFile()? 'file': (stats.isDirectory()? 'directory': false);
    if (! filetype) {
      return Promise.reject(filepath);
    }
    return Promise.resolve({
      filepath,
      filesize,
      filename,
      filetype,
    });
  })
}

module.exports = fileStat;
