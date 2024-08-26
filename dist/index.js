"use strict";
/**
 * This is the main ts script.
 * The script will download all content from requested URL
 *
 * @param dataPath - The path where the webpage will be stored.
 * @returns A local copy of the requested URL
 * @throws Will throw an error if the file could not be saved.
 */
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
const get_1 = require("./lib/get");
const convert_1 = require("./lib/convert");
const saveFile_1 = require("./lib/saveFile");
const path_1 = __importDefault(require("path"));
const dataPath = '/data';
const currentDir = process.cwd();
const fullPath = path_1.default.join(currentDir, dataPath);
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch HTML
        const html = yield (0, get_1.getHtml)("https://books.toscrape.com/");
        if (html) {
            // Save HTML file in data folder
            const htmlFile = yield (0, saveFile_1.saveFile)(fullPath, 'index.html', html);
            // Convert HTML to JSDOM
            const jsDomObject = yield (0, convert_1.convertToJSDom)(html);
            // save all  imageUrl in an Array
            const imgElements = jsDomObject.window.document.querySelectorAll('img');
            const imgUrlsArray = Array.from(imgElements).map(img => img.src);
            // Create folders for each imgURL
            const hej = yield (0, saveFile_1.saveFiles)(imgUrlsArray);
        }
        else {
            console.error('Error: No HTML content fetched from the URL');
        }
        return ('The webpage');
    }
    catch (error) {
        // Log the error with a detailed message
        console.error('An error occurred during the scraping process:', error);
        throw error;
    }
});
// Start the scraping process
main()
    .then(() => console.log('Scraping completed!')) // Log success message when scraping is complete
    .catch(err => console.error('Scraping failed:', err)); // Log error message if scraping fails
