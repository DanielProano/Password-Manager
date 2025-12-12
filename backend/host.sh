#! /bin/bash

sudo docker build -t backend-test .

sudo docker run -p 8080:8080 -d backend-test
