# Dependencies
* Node.js
* npm
* Docker (optional)

# Steps to run the server
1. Install Node.js and npm if not already installed.
2. Navigate to the project's root directory in the terminal.
3. Run `npm install` to install the project's dependencies.
4. Optionally, build and run the server in a Docker container by running:
   
   - For running the app locally: `npm run dev`
   - For testing the app: `npm run test`
   - For building the Docker image: `npm run docker:build`
   - For running the Docker image: `npm run docker:run`

# API Endpoints
- `/api/get-text`: Get the text from an image
- `/api/get-bboxes`: Get the bounding boxes of the text from an image

#complete api for running
localhost:8000/ocr/get-bboxes
localhost:8000/ocr/get-text



## Overview

fst is a backend server application built with Node.js. It provides functionality for handling HTTP requests, file uploads, and OCR (Optical Character Recognition) using Tesseract.js. The server is modularized with controllers, services, routes, helpers, middleware, and includes a comprehensive testing setup.

## Requirements

- Node.js (version 16 or higher recommended)
- Docker (if using Docker for deployment)

## Getting Started

### Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/fst.git
cd fst

