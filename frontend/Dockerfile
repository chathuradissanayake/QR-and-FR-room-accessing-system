# Stage 1: Build React App

# Use Node.js 20 on Alpine Linux as the base image for building the React app
FROM node:20-alpine AS build

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

# Stage 2: Serve React App with Nginx

# Use Nginx on Alpine Linux as the base image for serving the built app
FROM nginx:alpine

# Copy the built React app from the 'dist' folder of the build stage to Nginx's default HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom Nginx configuration file to override the default configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

 # Expose port 80 to allow external access to the Nginx server
EXPOSE 80

 # Start Nginx in the foreground to keep the container running
CMD ["nginx", "-g", "daemon off;"]