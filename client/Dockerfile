# Use the official Node.js image as the base image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Install dependencies using npm
RUN npm install

# Copy the entire Vite React application to the container
COPY . .

# Build the Vite application for production
RUN npm run build

# Expose the port that your Vite application is running on (assuming it's using the default port 3000)
EXPOSE 5173

# Run the production build of your Vite React application
CMD ["npm", "run", "host"]