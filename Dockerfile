FROM node:9-alpine as build
WORKDIR /app

ARG REACT_APP_ENV
ENV REACT_APP_ENV=$REACT_APP_ENV

COPY package.json /app
COPY package-lock.json /app
RUN npm install

COPY . /app
RUN npm run build

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]