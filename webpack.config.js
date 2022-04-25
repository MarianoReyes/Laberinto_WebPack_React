export default {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
    },
    devServer: {
        static: {
            directory: 'dist',
        },
        compress:true,
        port: 9000,
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                use: [{loader : 'babel-loader'}],
            },
            {
                test: /\.css$/,
                use: ['css-hot-loader',],
            },
            {
                test: /\.(png|jpg|gif|svg|mp3|ttf)$/,
                use: [{loader: 'file-loader'}]
            },
            
        ],
    
    },
}