export type ScrapingResult = {
    successes: string[]; // Array of file paths or URLs that were successfully processed
    nextpage?: HTMLAnchorElement;
    errors: ErrorDetail[]; // Array of errors, if any occurred
  }

export  type ErrorDetail = {
    fileUrl: string; // URL or path of the file related to the error
    error: any;      // Error details, can be any type (Error object, string message, etc.)
  }