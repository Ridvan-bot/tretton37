
/**
 * Convert sting to JSDOM
 * 
 * @param htmlData - The sting to be converted to JSDOM.
 * @param jsDom - Converted JSdom object.
 * @returns a jsdom object.
 * @throws Will throw an error if convert fails.
 */


import { JSDOM } from 'jsdom';

export const convertToJSDom = async (htmlData: string) => {
    try {
        // Convert HTML string to JSDOM object
        console.log('Starting to convert html sting to JSDOM...')
        const jsDom = new JSDOM(htmlData);
        return jsDom;
    } catch (error) {
        // Log the error for debugging
        console.error('Error converting HTML to JSDOM:', error);
        throw error;
    }
};
