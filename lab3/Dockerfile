FROM python:3.8-slim

MAINTAINER Roam

LABEL version='1.0'

RUN apt-get update && \
    apt-get install -y python3 && \
    useradd -m dmitrii

USER dmitrii

COPY hello-user.py /home/hello-user.py

ENV PERSON_NAME='Dmitrii'

WORKDIR /home

ENTRYPOINT ["python3", "hello-user.py"]
