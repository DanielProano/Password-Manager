#! /bin/bash

scp -i ~/LightsailDefaultKey-us-east-2.pem -r ./dist/* ubuntu@3.138.61.217:~/Password-Manager/frontend/dist/
