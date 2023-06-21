FROM node:20-alpine3.17

# Arguments defined in docker-compose.yml
ARG user
ARG uid

# Install system dependencies
RUN apk update
RUN apk add --no-cache \
    git \
    curl \
    libpng-dev \
    oniguruma-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    shadow

# Create system user 
RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/ && \ 
    chown -R $user:$user /home/$user

# Set working directory
WORKDIR /tractian-api

USER $user

EXPOSE 3000