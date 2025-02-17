# Use Node.js 16 as base image
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 5: Install nodemon globally
RUN npm install -g nodemon

# Copy the rest of the backend files
COPY . .

# Expose the port used by Express
EXPOSE 5000

# Start backend
CMD ["npm", "run", "start:dev"]