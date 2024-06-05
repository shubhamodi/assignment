import util from "util";
import httpStatus from 'http-status';
import { errorResponse, successResponse } from '../helpers/responses.js';
import * as ocrService from '../services/ocrService.js';
import {ApiError} from '../helpers/error/errorTypes.js';
import { BoxTypes } from '../constants/index.js';
import Tesseract from 'tesseract.js';
import { fileExtensionValidation, getFileAsBase64, validateBase64File, } from '../helpers/fileValidator.js';

export const getText = async (req, res) => {
    try {
        const { image } = req.body;
        const imageFile = req.files?.image_file;
        if (!image && !imageFile) {
          throw new ApiError(httpStatus.BAD_REQUEST, 'Image is required');
        }

        // console.log(`imageFile: ${imageFile} and image: ${image}`);

        if (image) {
            const text = await ocrService.imageToText(image);
            return successResponse(req, res, { text });
        }

        const buffer = imageFile.data;
        const data = buffer.toString('base64'); 
        const text = await ocrService.imageToText(data);
        return successResponse(req, res, { text });
    } 
    
    catch (error) {
        // console.log(`Error: ${JSON.stringify(error, null, 2)}`);
        if (error.message.includes('Error validating image file')) {
            error.message = 'Invalid base64_image.';
        } else {
            error.message = 'Error processing image';
        }
        return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message, error);
    }
};




export const getBBoxes = async (req, res,next) => {
  try {
    const bboxType = req.body.type || 'word'; // Default to 'word' bounding boxes
    const {image} = req.body;
    if(image){const boxes = await ocrService.getBBoxesFromImageAndType(image, bboxType); // Call service
    return successResponse(req, res, { boxes });}
      const imageFile = req.files.image_file;
      const buffer = imageFile.data;
      const data = buffer.toString('base64');

    // const validTypes = ['word', 'line', 'paragraph', 'block', 'page'];
    if(!image && !imageFile) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Image is required');
    }
    if (!BoxTypes.includes(bboxType)) {
      throw new ApiError(400, 'Invalid image data or bounding box type');
    }
   
    const boxes = await ocrService.getBBoxesFromImageAndType(data, bboxType); // Call service
    return successResponse(req, res, { boxes });
  } catch (error) {
     next(error);
  }
};
