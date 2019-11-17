FROM alpine

ARG PORT=1337

RUN apk add --no-cache python3 supervisor nodejs npm

RUN mkdir /opt/chat
COPY ./ /opt/chat
WORKDIR /opt/chat

EXPOSE 1337

ENTRYPOINT ["/opt/chat/entrypoint.sh"]