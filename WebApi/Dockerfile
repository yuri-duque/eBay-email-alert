FROM node:10.15.3-alpine

COPY $PWD /home/node

# INSTALL DEPENDENCIES
RUN cd /home/node && \
  npm install

# EXPOSE PORTS
EXPOSE 80/tcp

# RUN COMMAND
CMD ["/bin/sh", "-c", "cd /home/node; npm start;"]