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
exports.convertToJSDom = exports.getPage = exports.getPage_old = void 0;
const axios_1 = __importDefault(require("axios"));
const jsdom_1 = require("jsdom");
const getPage_old = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(url, { responseType: 'arraybuffer' });
        const html = Buffer.from(response.data, 'binary').toString('utf-8');
        if (html) {
            console.log(html);
            return (html);
        }
        else {
            console.log("bad bad bad");
        }
    }
    catch (_a) {
    }
});
exports.getPage_old = getPage_old;
const getPage = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(url, { responseType: 'arraybuffer' });
        const html = Buffer.from(response.data, 'binary').toString('utf-8');
        if (html) {
            return (html);
        }
        else {
            console.log("bad bad bad");
        }
    }
    catch (_a) {
    }
});
exports.getPage = getPage;
const convertToJSDom = (htmlData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // convert html sting to JSDOM object    
        const htmlData = '<html>...</html>';
        const jsDom = new jsdom_1.JSDOM(htmlData);
        return jsDom;
    }
    catch (_a) {
    }
});
exports.convertToJSDom = convertToJSDom;
