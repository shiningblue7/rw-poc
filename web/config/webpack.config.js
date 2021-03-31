//https://redwoodjs.com/docs/webpack-configuration.html
module.exports = (config, { env }) => {
  config.plugins.forEach((plugin) => {
    if (plugin.constructor.name === 'HtmlWebpackPlugin') {
      plugin.options.title = 'RW POC'
    }
  })

  return config
}