"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path_1 = require("path");
const openHtmlFile = (filePath) => {
    const fullPath = (0, path_1.join)(__dirname, filePath);
    const command = process.platform === 'win32' ? `start ${fullPath}` : `open ${fullPath}`;
    (0, child_process_1.exec)(command, (error) => {
        if (error) {
            console.error(`Error opening file: ${error.message}`);
        }
    });
};
// Replace 'index.html' with the path to your HTML file
openHtmlFile('../../data/index.html');
