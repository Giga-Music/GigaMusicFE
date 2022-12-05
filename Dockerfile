FROM node:16.13.0 as build

RUN mkdir /app

# Set the working directory
WORKDIR /app

# Add the source code to app
COPY . /app
# Install all the dependenci
RUN npm install
#RUN npm install @angular/cli

RUN npm run prod
