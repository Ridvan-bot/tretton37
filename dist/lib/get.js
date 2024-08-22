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
exports.downloadWebPage = void 0;
const axios_1 = __importDefault(require("axios"));
const downloadWebPage = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`Sending Get Request to: ${url}`);
        const response = yield axios_1.default.get(url, { responseType: 'arraybuffer' }); // Fetching the page content as a buffer to handle binary data
        if (response.data) {
            console.log(`Successfuly downloaded data from: ${url}`);
        }
        return response.data; // Returning the content
    }
    catch (error) {
        if (error instanceof Error) { // Checking if error is an instance of Error
            console.error(`Failed to download ${url}: ${error.message}`); // Logging any error that occurs during the download
        }
        else {
            console.error(`Failed to download ${url}: Unknown error`); // Fallback for non-standard errors
        }
        return ''; // Returning an empty string in case of an error
    }
});
exports.downloadWebPage = downloadWebPage;
