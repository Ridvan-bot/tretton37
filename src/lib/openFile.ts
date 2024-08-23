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

// Replace 'index.html' with the path to your HTML file
openHtmlFile('../../data/index.html');
