# NEXT_PUBLIC_API_URL is needed by the next.js build, which we define
# as a build ARG in API_URL.  NOTE: if you add or change anything to
# these build args, also update .github/workflows/docker-build-and-push.yml
# and the workflows that call it.
ARG API_URL
# API Service URLs, set via ENV in docker or next build
ARG IMAGE_URL
ARG SSO_URL
ARG POSTS_URL
ARG SEARCH_URL
ARG FEED_DISCOVERY_URL
ARG STATUS_URL
# Front-end Web URL, set via ENV in docker or next build
ARG WEB_URL

FROM node:lts-alpine as base

# Tini Entrypoint for Alpine
# util-linux required to optimize builds using multiple cores
RUN apk add --no-cache tini util-linux
ENTRYPOINT [ "/sbin/tini", "--"]

WORKDIR /frontend

COPY . .

FROM base as dependencies

# Copy the various API URLs build args over so next.js can see them in next.config.js
ARG API_URL
ENV NEXT_PUBLIC_API_URL ${API_URL}

ARG IMAGE_URL
ENV NEXT_PUBLIC_IMAGE_URL ${IMAGE_URL}

ARG SSO_URL
ENV NEXT_PUBLIC_SSO_URL ${SSO_URL}

ARG POSTS_URL
ENV NEXT_PUBLIC_POSTS_URL ${POSTS_URL}

ARG SEARCH_URL
ENV NEXT_PUBLIC_SEARCH_URL ${SEARCH_URL}

ARG FEED_DISCOVERY_URL
ENV NEXT_PUBLIC_FEED_DISCOVERY_URL ${FEED_DISCOVERY_URL}

ARG STATUS_URL
ENV NEXT_PUBLIC_STATUS_URL ${STATUS_URL}}

ARG WEB_URL
ENV NEXT_PUBLIC_WEB_URL ${WEB_URL}

RUN npm install --no-package-lock

RUN npm run build

FROM nginx:stable-alpine as build

COPY --from=dependencies /frontend/out /var/www/data
