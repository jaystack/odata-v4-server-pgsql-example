FROM node:latest

# Prepare ubuntu
ENV DEBIAN_FRONTEND noninteractive
RUN ln -sf /bin/bash /bin/sh

# Configure standard environment
WORKDIR /root/app

COPY ./ /root/app/

# Install supervisord
RUN apt-get update
RUN apt-get install -y supervisor nano
RUN mkdir -p /var/log/supervisor
COPY ./docker/supervisor.conf /etc/supervisor/conf.d/

RUN npm config set @types:registry https://registry.npmjs.org
RUN npm install -q
RUN npm cache clean
RUN npm run build

ENV NODE_ENV production

CMD /usr/bin/supervisord -n -c /etc/supervisor/supervisord.conf

EXPOSE 3000