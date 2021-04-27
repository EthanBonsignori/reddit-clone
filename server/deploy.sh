#!/bin/bash

echo Enter Version Number

read VERSION

docker build -t ethanbonsignori/notreddit:$VERSION .

docker push ethanbonsignori/notreddit:$VERSION

ssh root@165.227.121.140 "docker pull ethanbonsignori/notreddit:$VERSION && docker tag ethanbonsignori/notreddit:$VERSION dokku/api:latest && dokku deploy api latest"
