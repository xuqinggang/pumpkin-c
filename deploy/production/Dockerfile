FROM private-registry.sohucs.com/nangua/nangua_front_node:v8.9.3

WORKDIR /pumpkin-c/
COPY ./package.json /pumpkin-c/package.json
RUN npm install pumpkin-font-c --registry=http://10.10.126.140:4873 && \
        npm install
 
COPY ./ /pumpkin-c/
RUN npm run build_production

RUN chmod +x ./deploy_front.sh
RUN ./deploy_front.sh

EXPOSE 3000
ENTRYPOINT cd /pumpkin-c/ && \
    npm run server
