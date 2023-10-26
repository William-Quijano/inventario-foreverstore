module.exports = {
  transpileDependencies: [
    'vuetify'
  ],

  publicPath: '/',

  configureWebpack: {
    devServer: {
      historyApiFallback: true,
      https: false
    }
  },

  pluginOptions: {
    cordovaPath: 'src-cordova'
  }
}
