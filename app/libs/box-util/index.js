module.exports = {
  getEnv: require('./get-env').getEnv,
  isProduction: require('./get-env').isProduction,
  isDevelopment: require('./get-env').isDevelopment,
  fileStat: require('./file-stat'),
}
