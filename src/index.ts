import { getHtml } from './lib/get';
import { convertToJSDom } from './lib/convert';
import { saveFile } from './lib/saveFile';
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
            console.log('HTML successfully converted to JSDOM object');
        } else {
            console.error('Error: No HTML content fetched from the URL');
        }
    } catch (error) {
        // Log the error with a detailed message
        console.error('An error occurred during the scraping process:', error);

        // Optional: You can rethrow the error if you want the promise rejection to be caught in the .catch() after main() call
        throw error;
    }
};

// Start the scraping process
main()
    .then(() => console.log('Scraping completed!')) // Log success message when scraping is complete
    .catch(err => console.error('Scraping failed:', err)); // Log error message if scraping fails
