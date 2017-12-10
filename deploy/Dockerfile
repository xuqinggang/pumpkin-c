FROM private-registry.sohucs.com/nangua/nangua_front_node:v8.9.3

ADD ./ /pumpkin-c/

# RUN export PATH=$PATH:/opt/kuaizhan/bin && \
RUN    cd /pumpkin-c/ && \
    npm install pumpkin-font-c --registry=http://10.10.126.140:4873 && \
    npm install && \
    npm run build

EXPOSE 3000

ENTRYPOINT cd /pumpkin-c/ && \
    npm run server
