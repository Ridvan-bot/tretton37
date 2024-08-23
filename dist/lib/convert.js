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
exports.convertToJSDom = void 0;
const jsdom_1 = require("jsdom");
const convertToJSDom = (htmlData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Convert HTML string to JSDOM object
        console.log('Starting to convert html sting to JSDOM...');
        const jsDom = new jsdom_1.JSDOM(htmlData);
        return jsDom;
    }
    catch (error) {
        // Log the error for debugging
        console.error('Error converting HTML to JSDOM:', error);
        throw error;
    }
});
exports.convertToJSDom = convertToJSDom;
