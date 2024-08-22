import axios from 'axios';

export async function downloadWebPage(url: string): Promise<string> {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' }); // Fetching the page content as a buffer to handle binary data
    return response.data; // Returning the content
  } catch (error) {
    if (error instanceof Error) { // Checking if error is an instance of Error
      console.error(`Failed to download ${url}: ${error.message}`); // Logging any error that occurs during the download
    } else {
      console.error(`Failed to download ${url}: Unknown error`); // Fallback for non-standard errors
    }
    return ''; // Returning an empty string in case of an error
  }
}
