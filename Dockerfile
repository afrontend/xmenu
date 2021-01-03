FROM node:14

LABEL docker run --rm afrontend/xmenu xmenu

RUN npm install xmenu -g

