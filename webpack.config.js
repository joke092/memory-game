module.exports = {
    entry: "./js/app.js",
    output: { filename: "./js/out.js" },
    watch: true,
    devServer: {
        inline: true,
        contentBase: './',
        port: 3003
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-2', 'react']
                }
            }
        ]
    }
}