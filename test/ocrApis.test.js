import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import ocrRoutes from '../src/routes/ocrRoute.js';
import { expect } from 'chai';

const app = express();
app.use(bodyParser.json());
app.use('/ocr', ocrRoutes);

const testImage = "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";

describe('OCR API', () => {
    it('should return extracted text from image', async () => {
        const res = await request(app)
            .post('/ocr/get-text')
            .send({ image: `${testImage}` });
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('text');
    });

    it('should return bounding boxes from image', async () => {
        const res = await request(app)
            .post('/ocr/get-bboxes')
            .send({ image: `${testImage}`, type: 'word' });
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('elements');
    });

    it('should return 400 for missing image', async () => {
        const res = await request(app)
            .post('/ocr/get-text')
            .send({});
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error');
    });

    it('should return 400 for invalid base64 image', async () => {
        const res = await request(app)
            .post('/ocr/get-text')
            .send({ image: 'invalid-base64' });
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error');
    });
    
    it('should return 400 for invalid type parameter', async () => {
        const res = await request(app)
            .post('/ocr/get-bboxes')
            .send({ image: `${testImage}`, type: 'invalid' });
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error');
    });
});