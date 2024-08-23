
/**
 * Open the html file in a browser
 * 
 * @param filePath - The location of the file to be executed
 * @param command - The command to open the file.
 * @returns Nothing as of now, this will be e feature for the future.
 * @throws Will throw an error if openinig the file fails.
 */

import { exec } from 'child_process';
import { join } from 'path';

export const openHtmlFile = async (filePath: string) => {
    const fullPath = join(__dirname, filePath);
    const command = process.platform === 'win32' ? `start ${fullPath}` : `open ${fullPath}`;

    exec(command, (error) => {
        if (error) {
            console.error(`Error opening file: ${error.message}`);
        }
    });
};