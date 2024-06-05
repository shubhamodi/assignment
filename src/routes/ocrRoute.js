import express from 'express';
import { getText, getBBoxes } from '../controllers/ocrController.js';
import { validate } from '../middlewares/validator.js';
import * as ocrValidator from '../validators/ocrValidator.js';

const router = express.Router({ mergeParams: true });

router.post('/get-text', validate(ocrValidator.textSchema), getText);
 //extract text from image

router.post('/get-bboxes', validate(ocrValidator.bboxesSchema), getBBoxes);
 //return bounding box

export default router;