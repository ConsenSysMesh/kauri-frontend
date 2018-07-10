FROM gcr.io/kauri-197812/kauri-contract-abis:latest-dev

# setup workspace
RUN mkdir -p /usr/src/app/packages/kauri-web
RUN mkdir -p /usr/src/app/packages/kauri-components
WORKDIR /usr/src/app/packages/kauri-web

RUN npm install -g --unsafe-perm esy@preview

# kauri-components, ReasonML
COPY packages/kauri-components/package.json /usr/src/app/packages/kauri-components/
COPY packages/kauri-components/esy.lock /usr/src/app/packages/kauri-components/
RUN cd /usr/src/app/packages/kauri-components && esy install
RUN apt-get update && apt-get install -y rsync
RUN cd /usr/src/app/packages/kauri-components && esy build
RUN cd /usr/src/app/packages/kauri-components && npm run link-ppx

COPY packages/kauri-components /usr/src/app/packages/kauri-components/
RUN cd /usr/src/app/packages/kauri-components && npm run build

# kauri-web, ReasonML
COPY packages/kauri-web/package.json /usr/src/app/packages/kauri-web/
COPY packages/kauri-web/esy.lock /usr/src/app/packages/kauri-web/
RUN esy install

COPY packages/kauri-web /usr/src/app/packages/kauri-web/
RUN npm run build

# env settings
ENV GETH_BLOCKCHAIN=35.231.60.112:8545
ENV MONOLITH_EXTERNAL_API=api.dev.kauri.io
ENV MONOLITH_API=monolith.dev:8080
EXPOSE 3000

CMD "npm" "run" "start"
