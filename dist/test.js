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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const baseUrl = 'https://books.toscrape.com/';
const rootDir = './scraped_site';
function downloadPage(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(url, { responseType: 'arraybuffer' });
            return response.data;
        }
        catch (error) {
            console.error(`Failed to download ${url}: ${error.message}`);
            return '';
        }
    });
}
function saveFile(filePath, content) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fs.promises.mkdir(path.dirname(filePath), { recursive: true });
        yield fs.promises.writeFile(filePath, content);
    });
}
function scrapeSite() {
    return __awaiter(this, void 0, void 0, function* () {
        const visited = new Set();
        const toVisit = [{ url: baseUrl, localPath: 'index.html' }];
        while (toVisit.length > 0) {
            const { url, localPath } = toVisit.shift();
            if (visited.has(url))
                continue;
            visited.add(url);
            const content = yield downloadPage(url);
            if (!content)
                continue;
            const fullPath = path.join(rootDir, localPath);
            yield saveFile(fullPath, content);
            console.log(`Saved: ${fullPath}`);
            if (url.endsWith('.html')) {
                const $ = cheerio_1.default.load(content);
                $('a[href], img[src]').each((_i, el) => {
                    const tagName = $(el).prop('tagName').toLowerCase();
                    let resourceUrl = tagName === 'a' ? $(el).attr('href') : $(el).attr('src');
                    if (resourceUrl && !resourceUrl.startsWith('http')) {
                        resourceUrl = new URL(resourceUrl, baseUrl).href;
                    }
                    if (resourceUrl && !visited.has(resourceUrl)) {
                        const resourcePath = path.join(path.dirname(localPath), path.basename(resourceUrl));
                        toVisit.push({ url: resourceUrl, localPath: resourcePath });
                    }
                });
            }
        }
    });
}
scrapeSite()
    .then(() => console.log('Scraping completed!'))
    .catch(err => console.error('Scraping failed:', err));
