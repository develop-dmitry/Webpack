const path = require("path");
const pug = require("pug-plugin");
const fs = require("fs");

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
        new pug({
            pretty: true,
            extractCss: {
                filename: 'assets/css/styles.css'
            }
        })
    ],

    mode: "development",

    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: pug.loader,
            },
            {
                test: /\.(css|sass|scss)$/,
                use: ['css-loader', 'sass-loader']
            }
        ]
    }
}