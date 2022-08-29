const path = require("path");
const PugPlugin = require("pug-plugin");
const fs = require("fs");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

const PAGES_DIR = "./src/pages/";
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith(".pug"));
var entries = {};
PAGES.forEach(value => {
    let key = value.replace(".pug", "");
    entries[key] = PAGES_DIR + value;
})

module.exports = {
    output: {
        path: path.join(__dirname, "dist/"),
        publicPath: "/",
        filename: "assets/js/scripts.js"
    },

    entry: entries,

    plugins: [
        new PugPlugin({
            pretty: true,
            extractCss: {
                filename: 'assets/css/[name].css'
            }
        }),
        new BrowserSyncPlugin({
            host: "localhost",
            port: 3000,
            server: {
                baseDir: ['dist']
            }
        })
    ],

    mode: "development",

    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: PugPlugin.loader,
            },
            {
                test: /\.(css|sass|scss)$/,
                use: ['css-loader', 'sass-loader']
            }
        ]
    }
}