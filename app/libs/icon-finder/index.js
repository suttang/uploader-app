const extIconMap = {
  ai: 'icon-ai.png',
  doc: 'icon-doc.png',
  docx: 'icon-doc.png',
  pages: 'icon-doc.png',
  htm: 'icon-html.png',
  html: 'icon-html.png',
  jpg: 'icon-jpg.png',
  mp3: 'icon-mp3.png',
  pdf: 'icon-pdf.png',
  png: 'icon-png.png',
  ppt: 'icon-ppt.png',
  psd: 'icon-psd.png',
  txt: 'icon-txt.png',
  py: 'icon-txt.png',
  xls: 'icon-xls.png',
  xml: 'icon-xml.png',
  zip: 'icon-zip.png',
};
const fallbackIcon = extIconMap.txt;

module.exports = function findIcon(filename) {
  const filenames = filename.split('.');
  const extension = filenames[filenames.length - 1].toLowerCase();
  const icon = extIconMap[extension];
  if (icon) {
    return icon;
  }
  return extIconMap[fallbackIcon];
};
