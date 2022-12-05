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

# Stage 2: Serve app with nginx server
# Use official nginx image as the base image
FROM nginx:1.20.1

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist /usr/share/nginx/html

COPY /docker/nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 9086

CMD ["nginx", "-g", "daemon off;"]
