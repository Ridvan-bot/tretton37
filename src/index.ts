// Importing libs
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';


// Importing custom types
import { Page } from './lib/types'; // Importing the 'Page' type definition
import { downloadWebPage } from './lib/get';

// Base URL of the website
const baseUrl = 'https://books.toscrape.com/';
// Directory where the scraped content will be saved
const rootDir = '../data';

// Function to save a file at the specified path with the given content
const saveFile = async (filePath: string, content: string) => {
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true }); // Ensure the directory exists, create it if necessary
    await fs.promises.writeFile(filePath, content); // Write the content to the file
    return filePath; // Return the path where the file was saved
  }


downloadWebPage(baseUrl);

