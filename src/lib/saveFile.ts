
/**
 * Saves content to a file at the specified path.
 * If necessary, creates the directory structure for the file.
 * 
 * @param filePath - The path where the file should be saved, including the file name.
 * @param content - The content to write to the file.
 * @returns The path where the file was saved.
 * @throws Will throw an error if the file could not be saved.
 */
import * as fs from 'fs';
import * as path from 'path';

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
    throw error; // Re-throw the error to handle it further up the call stack
  }
};


