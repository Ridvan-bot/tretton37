
/**
 * Saves content to a file at the specified path.
 * If necessary, creates the directory structure for the file.
 * 
 * @param folderPath - The path where the file should be saved.
 * @param content - The content to write to the file.
 * @returns The path where the file was saved.
 * @throws Will throw an error if the file could not be saved.
 */
import * as fs from 'fs';
import * as path from 'path';
import axios from "axios";
import { asyncForEach } from './utils';
import { ScrapingResult, ErrorDetail } from './types'

export const saveFile = async (folderPath: string, fileName: string, content: string): Promise<string> => {
  try {
    // Check if the folder exists
    console.log('Check if data folder exists...')
    if (!fs.existsSync(folderPath)) {
      // If not, create the folder
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`Folder created at: ${folderPath}`);
    } else {
      console.log(`Folder already exists at: ${folderPath}`);
    }

    // Define the full file path including the file name
    const filePath = path.join(folderPath, fileName);

    // Write the content to the file
    if (content) {
      console.log('Creating file...')
      await fs.promises.writeFile(filePath, content);
      console.log(`File saved at: ${filePath}`);
      return filePath;
    } else {
      return "No content to save";
    }
  } catch (error) {
    console.error('Error saving file:', error);
    throw error; 
  }
};


// Check if folder and file from Array exists, download and creates folder & file if missing
export const saveFiles = async (fileArray: string[], baseurl: string) => {
  console.log('Downloading missing files...');
  
  // Track success and error information
  const results = {
    successes: [] as string[],
    errors: [] as { fileUrl: string, error: any }[],
  };

  await asyncForEach(fileArray, async (fileUrl) => {
    const dataDirectory = path.join(__dirname, '..', '..', 'data', fileUrl);
    const directory = path.dirname(dataDirectory); // Directory path

    // Ensure the directory exists, create it if not
    if (!fs.existsSync(directory)) {
      console.log(`Creating folder for image: ${fileUrl}`);
      fs.mkdirSync(directory, { recursive: true });
    }

    // Download the image
    try {
      // Combine baseurl and imageUrl using URL constructor
      const fullUrl = new URL(fileUrl, baseurl).href;
      if (!fs.existsSync(dataDirectory)) {
        const response = await axios({
          method: 'get',
          url: fullUrl,
          responseType: 'stream', // Ensure the response data is a stream
        });

        // Save the image to the file system
        const writer = fs.createWriteStream(dataDirectory);
        response.data.pipe(writer);

        // Handle the stream events
        writer.on('finish', () => {
          results.successes.push(fileUrl);
        });
        writer.on('error', (err) => {
          console.error(`Error saving image: ${fileUrl}`, err);
          results.errors.push({ fileUrl, error: err });
        });
      } else {
        results.successes.push(fileUrl);
      }
    } catch (error) {
      console.error(`Failed to download image: ${fileUrl}`, error);
      results.errors.push({ fileUrl, error });
    }
  });

  // Return the results object after all files have been processed
  return results;
};

