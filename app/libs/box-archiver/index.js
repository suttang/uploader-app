const os = require('os');
const fs = require('fs');
const {EventEmitter} = require('events');
const archiver = require('archiver');
const moment = require('moment');
const {app} = require('electron');

const Promise = require('bluebird');
const mkdir = Promise.promisify(fs.mkdir);
const stat = Promise.promisify(fs.stat);

const archiveType = 'zip';
const archiveBaseFilePath = `${os.tmpdir()}/${app.getName()}`;

class BoxArchiver extends EventEmitter {
  constructor() {
    super();
    this.files = [];
    this.baseFilepath = `${archiveBaseFilePath}`;
    this.filename = '';
    this.filepath = '';
  }

  add(file, type) {
    const item = new BoxArchiveItem(file, type);
    this.files.push(item);
  }

  clear() {
    this.files = [];
  }

  create() {
    this.filename = moment().format('YYYY-MM-DD_HH-mm-ss.SSS') + '.zip';
    this.filepath = `${this.baseFilepath}/${this.filename}`;

    stat(archiveBaseFilePath)
    // ディレクトリが存在するかどうか確認・なかったら作成
    .catch(error => {
      if (error.code == 'ENOENT') {
        return mkdir(archiveBaseFilePath);
      }
      return Promise.resolve();
    })
    // アーカイブ作成
    .then(() => {
      const archive = archiver(archiveType);
      const output = fs.createWriteStream(this.filepath);
      output.on('close', () => {
        this.emit('complete', archive);
      });

      archive.pipe(output);
      for (let file of this.files) {
        if (file.isFile) {
          archive.append(fs.createReadStream(file.path), { name: file.name });
        } else if (file.isDirectory) {
          archive.directory(file.path, file.name, file.file);
        } else {
          continue;
        }
      }
      archive.finalize();
    }).catch(error => {
      console.log(error);
    });
  }

  /**
   * load archived binary
   * @return {Promise}
   */
  load() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filepath, (error, data) => {
        if (error) {
          return reject(error);
        }
        return resolve(data);
      });
    });
  }
}


class BoxArchiveItem {
  /**
   * Constructor
   * @param  {File}   file
   * @param  {String} type
   */
  constructor(file, type) {
    this.file = file;
    this.type = type;
  }

  /**
   * ファイルのパスを返す
   * @return {String} ファイルパス
   */
  get path() {
    return this.file.path;
  }

  /**
   * ファイルのサイズを返す
   * @return {Number} ファイルサイズ
   */
  get size() {
    return this.file.size;
  }

  /**
   * ファイル名を返す
   * @return {String} ファイル名
   */
  get name() {
    return this.file.name;
  }

  /**
   * タイプが ファイル かどうかを返す
   * @return {Boolean}
   */
  get isFile() {
    return this.type === 'file';
  }

  /**
   * タイプが ディレクトリ かどうかを返す
   * @return {Boolean}
   */
  get isDirectory() {
    return this.type === 'directory';
  }
}

module.exports = {
  BoxArchiver,
  BoxArchiveItem,
};





    // archive.on('entry', (event) => {
    //   console.log(event.stats.size);
    // });
    // let inputBytes = 0;
    // let outputBytes = 0;
    // let isInputMode = true;
    // archive.on('data', (event) => {
    //   if (isInputMode) {
    //     inputBytes += event.length;
    //   } else {
    //     outputBytes += event.length;
    //   }
    //   // console.log(`${inputBytes} / ${outputBytes}`);
    // });
    //
    // archive.on('error', function(err) {
    //   throw err;
    // });
