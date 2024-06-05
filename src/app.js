// Om
// //use docker compose for multple containers
import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import ocrRoutes from './routes/ocrRoute.js';
import { errorResponse } from './helpers/responses.js';
import { errorHandler } from './helpers/error/errorHandler.js';
const app = express();
const port = process.env.APP_PORT || 8000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(fileUpload())
app.use('/ocr', ocrRoutes);   // OCR API

// Handeling Errors in routing
app.use(errorHandler);

//Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);   //printing to the terminal
});

// TODO: read chat gpt responses. ask for questions there for confused items.
// TODO: test the apis
// TODO: install docker and run the app in docker use chat gpt to learn how to do this
// TODO: use docker compose to deploy the app
// TODO: run tests by adding sample image buffer strings
// TODO: add nodemon for devlopment
// IMPROVEMENT: add env support for port number
// TODO: add readme for this project using markdown  