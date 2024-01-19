# Source: https://dev.to/rafaelmagalhaes/docker-and-nuxt-3-18nm

# use node 16 alpine image as build image
FROM node:16-alpine as builder

# create work directory in app folder
WORKDIR /app

# install required packages for node image
RUN apk --no-cache add openssh g++ make python3 git
RUN npm install -g pnpm

# copy over package.json files
COPY package.json /app/
COPY pnpm-lock.yaml /app/

# copy prisma folder
COPY prisma /app/

# install all dependencies
RUN pnpm i && pnpm store prune

# copy over all files to the work directory
ADD . /app

# build the project
RUN pnpm run build

# start final image
FROM node:20-alpine

WORKDIR /app

# copy over build files from builder step
COPY --from=builder /app/.output .output
COPY --from=builder /app/.nuxt .nuxt

# expose the host and port 3000 to the server
ENV HOST 0.0.0.0
EXPOSE 3000

# run the build project with node
ENTRYPOINT ["node", ".output/server/index.mjs"]