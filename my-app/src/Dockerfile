# Use Node.js as a base image
FROM node:14 as build

# Set the working directory
WORKDIR /src

# Copy the package files first to leverage Docker cache
COPY ../package*.json ./

# Install the necessary dependencies
RUN npm install

# Copy over the frontend application code from the src directory
COPY . .

# Run the build command
RUN npm run build

# Now setup nginx for serving the production build
FROM nginx:1.21-alpine as production
COPY --from=build /src/dist /usr/share/nginx/html
COPY ./src/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

# Use an official Node.js runtime as the base image
# FROM node:14

# # Set the working directory in the container
# WORKDIR /app/src

# # Copy package.json and package-lock.json to the container
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Expose port 8080
# EXPOSE 8080

# # Start the app
# CMD ["npm", "start"]

# FROM node:14

# WORKDIR /app/src

# COPY package*.json ./

# COPY . .

# EXPOSE 8080

# CMD ["npm", "start"]
