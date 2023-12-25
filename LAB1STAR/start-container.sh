#!/bin/bash

docker build -t my-node-app .
docker run -e "DATA_TO_WRITE=Hello, Docker!" my-node-app
