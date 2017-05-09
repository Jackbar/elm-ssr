const path = require('path')
const webpack = require('webpack')
const MFS = require('memory-fs')
const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')

module.exports = function setupDevServer (app, opts) {
  Object.keys(clientConfig.entry).forEach(function(name) {
    clientConfig.entry[name] = ['webpack-hot-middleware/client'].concat(clientConfig.entry[name])
})

  //服务端多入口
  clientConfig.output.filename = '[name].js'
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )

  // dev middleware
  const clientCompiler = webpack(clientConfig)
  const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false
    }
  })
  app.use(devMiddleware)
  clientCompiler.plugin('done', () => {
    const fs = devMiddleware.fileSystem

    //在这里判断文件是否在内存中
    const appPath = path.join(clientConfig.output.path, 'app.html')//client ssr 页面
    if (fs.existsSync(appPath)) {
      const index = fs.readFileSync(appPath, 'utf-8')
      opts.indexUpdated(index)
    }
     const josePath = path.join(clientConfig.output.path, 'jose.html')//jose spa 页面
    if (fs.existsSync(josePath)) {
      const jose = fs.readFileSync(josePath, 'utf-8')
      opts.joseUpdated(jose)
    }
     const phinePath = path.join(clientConfig.output.path, 'phine.html')//phine spa 页面
    if (fs.existsSync(phinePath)) {
      const phine = fs.readFileSync(phinePath, 'utf-8')
      opts.phineUpdated(phine)
    }
  })

  // hot middleware
  app.use(require('webpack-hot-middleware')(clientCompiler))

  // watch and update server renderer
  const serverCompiler = webpack(serverConfig)
  const mfs = new MFS()
  const outputPath = path.join(serverConfig.output.path, serverConfig.output.filename)
  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(err => console.warn(err))
    opts.bundleUpdated(mfs.readFileSync(outputPath, 'utf-8'))
  })
}
