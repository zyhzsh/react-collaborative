# Use an official Node.js runtime as the base image
FROM --platform=linux/amd64 node:16-slim

# Create a directory for the app and set it as the working directory
WORKDIR /app

# Copy over package.json and package-lock.json
COPY package*.json ./


# Copy the rest of the application files
COPY . .

# Set the environment variable for Node.js
ENV PORT 4444

# The command to start the application
CMD [ "npm", "start" ]