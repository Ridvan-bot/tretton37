import axios from "axios";

export const getHtml = async (url: string) => {
    try {
      console.log(`Fetching url: ${url}`)
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const html = Buffer.from(response.data, 'binary').toString('utf-8');
        if (html) {
          console.log('Fetch completed succesfully')
            return html;
        } else {
            console.error("Error: Received empty HTML content");
            return null;
        }
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error fetching HTML:', error);
        throw error;
    }
};
