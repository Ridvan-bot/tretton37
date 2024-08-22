// Importing libs
import * as cheerio from 'cheerio';
import * as path from 'path';

// Importing custom types
import { Page } from './lib/types'; // Importing the 'Page' type definition
import { downloadWebPage } from './lib/get';
import { saveFile } from './lib/saveFile';

// Base URL of the website
const baseUrl = 'https://books.toscrape.com/';
// Directory where the scraped content will be saved
const localPath = '/data';

const currentDir = process.cwd();
const fullPath = path.join(currentDir, localPath);


// Main function to scrape the site
const main = async () => {    

const content = await downloadWebPage(baseUrl);
const savedFilesResult = await saveFile(fullPath, content);

}
  
  // Start the scraping process
  main()
    .then(() => console.log('Scraping completed!')) // Log success message when scraping is complete
    .catch(err => console.error('Scraping failed:', err)); // Log error message if scraping fails