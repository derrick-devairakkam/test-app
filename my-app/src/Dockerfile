# Use an official Node.js runtime as the base image
FROM base-image:latest

# Set the working directory in the container
WORKDIR /app/src

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 8080
EXPOSE 8080

# Start the app
CMD ["npm", "start"]
