import pkg from 'webpack';
const { webpack } = pkg;

import { fileURLToPath } from 'node:url';

import { dirname, resolve } from 'node:path';
export const __dirname = dirname(fileURLToPath(import.meta.url));

const compiler1 = webpack({
    mode: "production",
    entry: "./src/content.js",
    output: {
        filename: "content.js",
        path: resolve(__dirname, "./extension/")
    }
})

compiler1.run((err, stats) => {
    console.log(stats)
    if (err) {
        console.log(err);
    }   else    {
        // console.log('build succeded!');
    }
    // console.log(stats)
    compiler1.close((closeErr) => {
        // console.log(closeErr);
    })
})

const compiler2 = webpack({
    mode: "production",
    entry: "./src/background.js",
    output: {
        filename: "background.js",
        path: resolve(__dirname, "./extension/")
    }
})

compiler2.run((err, stats) => {
    console.log(stats)
    if (err) {
        console.log(err);
    }   else    {
        // console.log('build succeded!');
    }
    // console.log(stats)
    compiler2.close((closeErr) => {
        // console.log(closeErr);
    })
})

const compiler3 = webpack({
    mode: "production",
    entry: "./src/popup.js",
    output: {
        filename: "popup.js",
        path: resolve(__dirname, "./extension/popup/")
    }
})

compiler3.run((err, stats) => {
    console.log(stats)
    if (err) {
        console.log(err);
    }   else    {
        // console.log('build succeded!');
    }
    // console.log(stats)
    compiler3.close((closeErr) => {
        // console.log(closeErr);
    })
})