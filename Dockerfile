FROM node:lts-alpine3.15 AS build

WORKDIR /dist/src/app
COPY package.json package-lock.json ./

RUN npm cache clean --force
RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:latest AS ngi

COPY --from=build /dist/src/app/dist/webshop-frontend /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80