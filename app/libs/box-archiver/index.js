const fs = require('fs');
const archiver = require('archiver');
const archive = archiver('zip');

class BoxArchiver {
  constructor() {
    this.files = [];
    console.log('archiver');
  }

  add(file, type) {
    const item = new BoxArchiveItem(file, type);
    console.log(item.path, item.size, item.name, item.type, item.isFile, item.isDirectory);
    this.files.push(item);
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
