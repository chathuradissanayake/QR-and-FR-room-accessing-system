# Stage 1: Build React App

# Use Node.js 20 on Alpine Linux as the base image for building the React app
FROM node:20-alpine AS build

RUN apk add --no-cache python3 make g++
# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

 # Install the project dependencies listed in package.json
RUN npm install --force

# Copy all project files from the current directory to the container's working directory
COPY . .

 # Build the React application for production, creating the optimized output in the 'dist' folder
RUN npm run build

# Stage 2: Serve React App with Caddy

FROM caddy:2.9.1-alpine

# Copy the build files from Stage 1 into the default Caddy web root
COPY --from=build /app/dist /srv

# Copy your Caddyfile into the container
COPY Caddyfile /etc/caddy/Caddyfile