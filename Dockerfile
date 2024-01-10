FROM library/node:14.16-alpine
LABEL maintainer=Gilles\ Perreymond\ <gperreymond@gmail.com>

# Prepare the destination
RUN mkdir -p /usr/app
WORKDIR /usr/app

# Allow to fetch artifacts from TLS endpoint during the builds and by Nomad after.
# Install timezone data so we can run Nomad periodic jobs containing timezone information
RUN apk --update --no-cache add \
    bash \
    ca-certificates \
    dumb-init \
    libcap \
    tzdata \
    su-exec \
  && update-ca-certificates

# https://github.com/sgerrand/alpine-pkg-glibc/releases
ARG GLIBC_VERSION=2.33-r0
ADD https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub /etc/apk/keys/sgerrand.rsa.pub
ADD https://github.com/sgerrand/alpine-pkg-glibc/releases/download/${GLIBC_VERSION}/glibc-${GLIBC_VERSION}.apk \
    glibc.apk
RUN apk add --no-cache \
    glibc.apk \
    && rm glibc.apk

# Add source files
COPY . /usr/app

# Make the install in the container to avoid compilation problems
RUN yarn install --production && \
    yarn autoclean --init && \
    yarn autoclean --force

# Clean image
RUN npm uninstall -g npm && \
    rm -rf /tmp/* /var/cache/apk/* /root/.npm /root/.node-gyp

# Start application
ENTRYPOINT ["./docker-entrypoint.sh"]