"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openHtmlFile = void 0;
const child_process_1 = require("child_process");
const path_1 = require("path");
const openHtmlFile = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const fullPath = (0, path_1.join)(__dirname, filePath);
    const command = process.platform === 'win32' ? `start ${fullPath}` : `open ${fullPath}`;
    (0, child_process_1.exec)(command, (error) => {
        if (error) {
            console.error(`Error opening file: ${error.message}`);
        }
    });
});
exports.openHtmlFile = openHtmlFile;
// Replace 'index.html' with the path to your HTML file
(0, exports.openHtmlFile)('../../data/index.html');
