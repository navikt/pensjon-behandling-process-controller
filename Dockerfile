#FROM gcr.io/distroless/nodejs20-debian11
FROM node:20

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY node_modules/ node_modules/
COPY build/ build/
COPY server.mjs .

EXPOSE 8080

CMD ["./server.mjs"]
