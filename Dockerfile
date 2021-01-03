FROM node:14

LABEL docker run --rm frontendwordpress/xmenu xmenu

RUN npm install xmenu -g

