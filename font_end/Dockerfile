# Use an official node image as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages
RUN npm install

# Build the app
RUN npm run build

# Serve the app
RUN npm install -g serve
CMD ["serve", "-s", "build"]

# Make port 3000 available to the world outside this container
EXPOSE 3000