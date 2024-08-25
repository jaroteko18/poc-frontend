FROM registry.kanosolution.net/devops/node:git-alpine3.18

RUN apk update && apk upgrade && apk add git
RUN mkdir -p /source/lib/suimjs
RUN git clone https://github.com/sebarcode/suimjs /source/lib/suimjs
WORKDIR /source/lib/suimjs
RUN npm install --force

RUN mkdir -p /source/lib/vite-plugin-vue-auto-route
RUN git clone https://github.com/andrifebrih/vite-plugin-vue-auto-route /source/lib/vite-plugin-vue-auto-route
WORKDIR /source/lib/vite-plugin-vue-auto-route
RUN npm install --force


WORKDIR /source/app/web-app
COPY package.json /source/app/web-app/package.json
RUN npm install

COPY . /source/app/web-app
COPY devops/dev.deploy/.env.file /source/app/web-app/.env
RUN npm run build

CMD ["npm","run","preview"]