import * as pdfjsLib from 'pdfjs-dist';

// Configure the worker from a CDN that matches the exact installed version
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@6.1.200/build/pdf.worker.min.mjs';

/**
 * Extracts text from a PDF file in the browser.
 * @param {File} file - The uploaded PDF file
 * @returns {Promise<string>} - Extracted text content
 */
export const extractTextFromPdf = async (file) => {
  return new Promise((resolve, reject) => {
    // Basic format validation
    if (!file || file.type !== 'application/pdf') {
      return reject(new Error('Invalid File Type: Please upload a valid PDF document.'));
    }

    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const typedArray = new Uint8Array(e.target.result);
        
        // Load the PDF document
        const loadingTask = pdfjsLib.getDocument({ data: typedArray });
        const pdf = await loadingTask.promise;
        
        let extractedText = '';
        
        // Loop through each page to extract text content
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          
          // Join tokenized strings together with appropriate spacing
          const pageText = textContent.items
            .map((item) => item.str)
            .join(' ');
            
          extractedText += pageText + '\n\n';
        }
        
        const cleanText = extractedText.trim();
        
        if (!cleanText) {
          return reject(new Error('Empty PDF: We found no readable text in this document. It might be scanned or image-only.'));
        }
        
        resolve(cleanText);
      } catch (error) {
        console.error('PDF JS Extraction error:', error);
        reject(new Error('PDF Analysis Failed: Could not process PDF content. Please ensure the file is not corrupted.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('File Reader Error: Failed to read the selected file.'));
    };

    reader.readAsArrayBuffer(file);
  });
};
