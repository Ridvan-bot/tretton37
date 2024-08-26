
/**
 * This is the main ts script.
 * The script will download all content from requested URL
 * 
 * @param dataPath - The path where the webpage will be stored.
 * @returns A local copy of the requested URL
 * @throws Will throw an error if the file could not be saved.
 */

import { getHtml } from './lib/get';
import { convertToJSDom } from './lib/convert';
import { saveFile, saveFiles } from './lib/saveFile';
import path from 'path';

const dataPath = '/data';
const currentDir = process.cwd();
const fullPath = path.join(currentDir, dataPath);

const main = async () => {
    try {
        // Fetch HTML
        const html = await getHtml("https://books.toscrape.com/");
        if (html) {
            // Save HTML file in data folder
            const htmlFile = await saveFile(fullPath, 'index.html', html);
            // Convert HTML to JSDOM
            const jsDomObject = await convertToJSDom(html);
            // save all  imageUrl in an Array
            const imgElements = jsDomObject.window.document.querySelectorAll('img');
            const imgUrlsArray = Array.from(imgElements).map(img => img.src);
            // Create folders for each imgURL
            const hej = await saveFiles(imgUrlsArray)
        } else {
            console.error('Error: No HTML content fetched from the URL');
        }
        return('The webpage')
    } catch (error) {
        // Log the error with a detailed message
        console.error('An error occurred during the scraping process:', error);
        throw error;
    }
};

// Start the scraping process
main()
    .then(() => console.log('Scraping completed!')) // Log success message when scraping is complete
    .catch(err => console.error('Scraping failed:', err)); // Log error message if scraping fails
