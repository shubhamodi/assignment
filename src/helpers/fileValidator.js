import fs from 'fs';
import Joi from 'joi';
import path from 'path';

const validExtensions = ['.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.gif'];
export const fileExtensionValidation = (value, helpers) => {
    const extension = path.extname(value).toLowerCase();
    if (!validExtensions.includes(extension)) {
        return helpers.message('Invalid file extension');
    }
    return value;
};
const isBase64 = (str) => {
    if (typeof str !== 'string') {
      throw new TypeError('Input must be a string');
    }
  
    try {
      return Buffer.from(str, 'base64').toString('base64') === str;
    } catch (err) {
      // Handle potential base64 decoding errors
      return false;
    }
  };
  
export const validateBase64File = async (filePath) => {
    try {
        //// filepath = req.files.image_file
      console.log(`file here ${JSON.stringify(filePath)}`)
      const fileContent = await fs.promises.readFile(filePath.data);
  
      // Check if fileContent is a string (assuming base64 encoding)
      if (typeof fileContent === 'string') {
        return isBase64(fileContent); // Use improved isBase64 function
      } else {
        // Handle non-string file content (e.g., buffer, binary data)
        throw new Error('File content is not expected format (string)');
      }
    } catch (error) {
      console.error(`Error processing file: ${error.message}`); // Log error details
      throw error; // Re-throwing the error for further handling
    }
  };


export const validateImageFile = async (filePath)  =>{
    try {
        const buffer = await fs.readFile(filePath);
        const type = await fileType.fromBuffer(buffer);

        if (!type || !type.mime.startsWith('image/')) {
            throw new Error('Invalid image file');
        }

        return buffer.toString('base64');
    } catch (error) {
        throw new Error(`Error validating image file: ${error.message}`);
    }
}

export const getFileAsBase64 = async (file) => {
    console.log(`file here ${JSON.stringify(file)}`)
    const filePath = path.join(__dirname, file.path);
    console.log(`filepath here ${JSON.stringify(filePath)}`)
    return validateImageFile(filePath);
}