"use strict";
/**
 * Fetches html content from requested URL
 *
 * @param url - The requested url as an input.
 * @param html - The html variable contains the HTML content of the web page as a string.
 * @returns HTML content of the web page as a string.
 * @throws Will throw an error if the get request fails.
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
exports.getHtml = void 0;
const axios_1 = __importDefault(require("axios"));
const getHtml = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`Fetching url: ${url}`);
        const response = yield axios_1.default.get(url, { responseType: 'arraybuffer' });
        const html = Buffer.from(response.data, 'binary').toString('utf-8');
        if (html) {
            console.log('Fetch completed succesfully');
            return html;
        }
        else {
            console.error("Error: Received empty HTML content");
            return null;
        }
    }
    catch (error) {
        // Log the error for debugging purposes
        console.error('Error fetching HTML:', error);
        throw error;
    }
});
exports.getHtml = getHtml;
