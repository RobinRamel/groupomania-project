module.exports = {
  devServer: {
    disableHostCheck: true,
    port: 8080,
    public: '0.0.0.0:8080'
  },
  publicPath: "/",
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/scss/main.scss";
        `
      }
    }
  }
}