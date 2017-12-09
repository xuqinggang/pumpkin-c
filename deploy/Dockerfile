FROM node:8.9.2

ADD ./ /pumpkin-b/

# RUN export PATH=$PATH:/opt/kuaizhan/bin && \
RUN    cd /pumpkin-b/ && \
    npm install pumpkin-font-c --registry=http://10.10.126.140:4873 && \
    npm install && \
    npm run build

EXPOSE 80

# ENTRYPOINT cd /pumpkin-b/ && \
#     NODE_ENV=$ENV_NAME /opt/kuaizhan/bin/node server/index.js --port=80
