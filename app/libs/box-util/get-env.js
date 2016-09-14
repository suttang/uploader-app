const env = process.env.NODE_ENV;

module.exports = {
  getEnv() {
    return env;
  },
  isProduction() {
    return env === 'production';
  },
  isDevelopment() {
    return env === 'development';
  }
};
