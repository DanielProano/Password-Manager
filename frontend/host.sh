#! /bin/bash

sudo docker build -t test .

sudo docker run -p 5173:5173 -d test
