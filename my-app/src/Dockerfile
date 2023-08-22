# syntax=docker/dockerfile:1.4

# Create image based on the official Node image from dockerhub
FROM node:lts-buster AS development

# Create app directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

# Install dependecies
#RUN npm set progress=false \
#    && npm config set depth 0 \
#    && npm i install
RUN npm ci

# Get all the code needed to run the app
COPY . /usr/src/app

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["npm", "start"]

FROM development as dev-envs
RUN <<EOF
apt-get update
apt-get install -y --no-install-recommends git
EOF

RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD [ "npm", "start" ]



# # Use Node.js as a base image
# FROM node:14 as build

# # Set the working directory
# WORKDIR /src

# # Copy the package files first to leverage Docker cache
# COPY ../package*.json ./

# # Install the necessary dependencies
# RUN npm install

# # Copy over the frontend application code from the src directory
# COPY . .

# # Run the build command
# RUN npm run build

# # Now setup nginx for serving the production build
# FROM nginx:1.21-alpine as production
# COPY --from=build /src/dist /usr/share/nginx/html
# COPY ./src/nginx/default.conf /etc/nginx/conf.d/default.conf
# EXPOSE 8080
# CMD ["nginx", "-g", "daemon off;"]
