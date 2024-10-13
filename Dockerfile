# Using an official Node.js runtime as a parent image
FROM node:20.15.0-bullseye-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

RUN npm ci --omit=dev

# Copy the application source code
COPY ./src ./src

# Expose the application port
EXPOSE 3001

CMD ["npm", "start"]
