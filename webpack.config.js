var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
      './node_modules/babel-polyfill/dist/polyfill.min.js',
      './src/js/main.js',
      './src/scss/style.scss',
      ],
    watch: false,
    output: {
        filename: './js/app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?importLoaders=1'],
                }),
            },
            {
                test: /\.(sass|scss)$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?sourceMap', 'sass-loader']
                })
            },
            {
              test: /\.(png|jpeg|ttf|...)$/,
              use: [
               { 
                loader: 'file-loader',
                options: {
                  emitFile: false,
                  useRelativePath: false,
                  name: '[name].[ext]',
                  outputPath: '../images/',
                }
              }
               // limit => file.size =< 8192 bytes ? DataURI : File
              ]
            },
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['env']
                }
              }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: './css/style.css',
            allChunks: true,
        }),
    ]
};
