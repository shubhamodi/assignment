FROM node:18  # Base image with Node.js 18

WORKDIR /app

# Copy package.json and Dockerfile
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining project files
COPY . .

# Expose server port
EXPOSE 3000  # Port where the Express server listens

# Start the server
CMD [ "node", "src/app.js" ]
