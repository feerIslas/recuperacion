const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    // 1. Establecer el modo de ejecución
    mode: 'development',
    // 2. Especificando el archivo de entrada
    entry: './client/index.js',
    // 3. Especificando el archivo de salida
    output: {
        // 4. Ruta absoluta de salida.
        path: path.join(__dirname, 'public'),
        // 5. Nombre del archivo de salida.
        filename: 'js/bundle.js',
        // 6. Ruta del path publica para fines del sevidor de desarrollo
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        'modules': false,
                                        'useBuiltIns': 'usage',
                                        'targets': {"chrome": "80"},
                                        'corejs': 3
                                    }
                                ]
                            ],
                            "plugins": [
                                [
                                    "module-resolver",
                                    {
                                        "root": ["./"],
                                        "alias": {
                                            "@client": "./client"
                                        }
                                    }
                                ]
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [MiniCSSExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins: [
        new MiniCSSExtractPlugin({
            filename: 'styles/app.css'
        })
    ]
}