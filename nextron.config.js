module.exports = {
    webpack: (defaultConfig, env) =>
      Object.assign(defaultConfig, {
        entry: {
          background: './main/app.js',
          // preload: './main/preload.js',
        },
      }),
  };