FROM registry.john-kevin.me/base-image:1

RUN mkdir -p /opt/workspace/server
WORKDIR /opt/workspace/server

COPY server/package.json .
COPY server/yarn.lock .

RUN yarn --freeze-lockfile

COPY . /opt/workspace

EXPOSE 8080
SHELL [ "/bin/bash", "--rcfile", "/root/.bashrc", "-ci" ]
CMD ["/opt/workspace/start.sh"]
