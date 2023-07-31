FROM node:20.5.0-alpine as builder
RUN mkdir ./app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

RUN mkdir ./webpage
WORKDIR /app/webpage
COPY . /app/webpage
RUN npm i -g pnpm
RUN pnpm i
RUN pnpm build

FROM nginx:latest

COPY ./default.conf /etc/nginx/conf.d/default.conf
WORKDIR /etc/nginx
RUN mkdir ./dist
COPY --from=builder /app/webpage/dist /etc/nginx/dist
 
CMD ["nginx", "-g", "daemon off;"]