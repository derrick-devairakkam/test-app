# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /server

# Copy package.json and package-lock.json to the container
COPY ../package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
