"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.saveFiles = exports.saveFile = void 0;
/**
 * Saves content to a file at the specified path.
 * If necessary, creates the directory structure for the file.
 *
 * @param folderPath - The path where the file should be saved.
 * @param content - The content to write to the file.
 * @returns The path where the file was saved.
 * @throws Will throw an error if the file could not be saved.
 */
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const utils_1 = require("./utils");
const saveFile = (folderPath, fileName, content) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the folder exists
        console.log('Check if data folder exists...');
        if (!fs.existsSync(folderPath)) {
            // If not, create the folder
            fs.mkdirSync(folderPath, { recursive: true });
            console.log(`Folder created at: ${folderPath}`);
        }
        else {
            console.log(`Folder already exists at: ${folderPath}`);
        }
        // Define the full file path including the file name
        const filePath = path.join(folderPath, fileName);
        // Write the content to the file
        if (content) {
            console.log('Creating file...');
            yield fs.promises.writeFile(filePath, content);
            console.log(`File saved at: ${filePath}`);
            return filePath;
        }
        else {
            return "No content to save";
        }
    }
    catch (error) {
        console.error('Error saving file:', error);
        throw error;
    }
});
exports.saveFile = saveFile;
// create a folder for each element in the URL
const saveFiles = (imgUrlsArray) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, utils_1.asyncForEach)(imgUrlsArray, (imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
        const imagePath = path.join(__dirname, imageUrl); // Full path for the image
        const directory = path.dirname(imagePath); // Directory path
        // Ensure the directory exists, create it if not
        if (!fs.existsSync(directory)) {
            console.log(`Creating folder from imgeUrl: ${imageUrl}`);
            fs.mkdirSync(directory, { recursive: true });
        }
    }));
});
exports.saveFiles = saveFiles;
