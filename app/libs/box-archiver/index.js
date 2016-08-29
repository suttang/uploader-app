const fs = require('fs');
const {EventEmitter} = require('events');
const archiver = require('archiver');

const archiveType = 'zip';
const archiveFilePath = '/Users/suttang/Desktop/archive_from_archiver.zip';

class BoxArchiver extends EventEmitter {
  constructor() {
    super();
    this.files = [];
  }

  add(file, type) {
    const item = new BoxArchiveItem(file, type);
    // console.log(item.path, item.size, item.name, item.type, item.isFile, item.isDirectory);
    this.files.push(item);
  }

  clear() {
    this.files = [];
  }

  create() {
    const archive = archiver(archiveType);
    const output = fs.createWriteStream(archiveFilePath);
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
