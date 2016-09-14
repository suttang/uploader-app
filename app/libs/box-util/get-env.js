const env = process.env.NODE_ENV;

module.exports = {
  getEnv() {
    if (env === 'production') {
      return env;
    }
    return 'development';
  },
  isProduction() {
    return env === 'production';
  },
};
