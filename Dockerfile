#########################
### build environment ###
#########################

# base image
FROM node as builder

# set working directory
WORKDIR /usr/src/samplesheet

# add `/usr/src/samplesheet/node_modules/.bin` to $PATH
ENV PATH /usr/src/samplesheet/node_modules/.bin:$PATH

# add app
COPY . /usr/src/samplesheet

# install and cache app dependencies
RUN npm install
RUN npm install -g @angular/cli

# build environment var
ARG env

RUN echo "$env"

# generate build
RUN node --max_old_space_size=4096 node_modules/@angular/cli/bin/ng build --prod --c="$env"

##################
### production ###
##################

# base image
FROM nginx:1.13.9-alpine

# Remove default nginx configs
RUN rm -f /etc/nginx/conf.d/*

# nginx environment var
ARG nginx_env="configs"

# Add project configuration files
COPY nginx/${nginx_env}/* /etc/nginx/conf.d/

# copy artifact build from the 'build environment'
COPY --from=builder /usr/src/samplesheet/dist/GEM-SSG/ /usr/src/samplesheet/

EXPOSE 8080 8081

COPY start.sh .
RUN chmod +x start.sh
ENTRYPOINT [ "./start.sh" ]
