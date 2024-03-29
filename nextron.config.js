module.exports = {
  mainSrcDir: './src/main',
  rendererSrcDir: './src/renderer',
  webpack: (defaultConfig, env) =>
    Object.assign(defaultConfig, {
      entry: {
        background: './src/main/app.js',
      },
    }),
};