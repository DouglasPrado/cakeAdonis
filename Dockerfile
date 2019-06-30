FROM mhart/alpine-node

ENV HOME=/home/app
WORKDIR $HOME

COPY . $HOME

RUN npm config set unsafe-perm true
RUN npm install
RUN npm install @adonisjs/cli -g

COPY init.sh /usr/local/bin/

RUN chmod +x /usr/local/bin/init.sh
ENTRYPOINT [ "init.sh" ]
