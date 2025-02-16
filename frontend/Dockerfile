# Use Node.js 16 as base image
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend files
COPY . .

# Expose the port React runs on
EXPOSE 3000

# Start frontend
CMD ["npm", "start:dev"]