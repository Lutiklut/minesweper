const path = require('path')

module.exports = {
    entry:  path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath:'.dist/'
    },
    devServer: {
        watchFiles: path.join(__dirname, 'src'),
        port: 8080
    }
};

