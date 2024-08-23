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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("./test");
const saveFile_test_1 = require("./saveFile_test");
const path_1 = __importDefault(require("path"));
const dataPath = '/data';
const currentDir = process.cwd();
const fullPath = path_1.default.join(currentDir, dataPath);
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // fetch html 
        const html = yield (0, test_1.getPage)("https://books.toscrape.com/");
        //save html file
        console.log(html);
        if (html) {
            const htmlFile = yield (0, saveFile_test_1.saveFile)(fullPath, 'index.html', html);
            console.log(htmlFile);
            // convert html to JSDOM
            const jsDomObject = yield (0, test_1.convertToJSDom)(html);
            console.log(jsDomObject);
        }
    }
    catch (_a) {
    }
});
main();
