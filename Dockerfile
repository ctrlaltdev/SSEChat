FROM alpine

ARG PORT=1337

RUN apk add --no-cache python3 supervisor nodejs npm

RUN mkdir /opt/chat
COPY ./ /opt/chat
WORKDIR /opt/chat
RUN npm ci
RUN npm run build

EXPOSE 1337

ENTRYPOINT ["/opt/chat/entrypoint.sh"]