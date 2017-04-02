var dir = "./observer/"

module.exports = {
    entry: dir + 'main.js',
    output: {
        path: __dirname,
        filename: dir + 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
}