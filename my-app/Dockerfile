# Use an official Node image. You can specify the version as needed.
FROM node:14

WORKDIR /app

# Copy webpack config and package files
COPY webpack.config.js ./
COPY package*.json ./

# Install shared node modules
RUN npm install

# The base Dockerfile ends here. No CMD or ENTRYPOINT needed.