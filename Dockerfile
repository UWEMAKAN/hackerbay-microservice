FROM node:12.16.1

WORKDIR /usr/src/microservice-api

COPY ./ ./

RUN npm install

EXPOSE 4000

CMD [ "/bin/bash" ]
