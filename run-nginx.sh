#!/bin/bash

docker run -p 8080:80 -v ./:/usr/share/nginx/html:ro -d --rm nginx
