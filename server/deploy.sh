#!/bin/bash

PACKAGE_VERSION=$(sed -nE 's/^\s*"version": "(.*?)",$/\1/p' package.json)

echo "Current Version: $PACKAGE_VERSION"

echo "Enter Next Version Number"
read VERSION

npm version $VERSION

docker build -t ethanbonsignori/notreddit:$VERSION .

docker push ethanbonsignori/notreddit:$VERSION

ssh root@165.227.121.140 "docker pull ethanbonsignori/notreddit:$VERSION && docker tag ethanbonsignori/notreddit:$VERSION dokku/api:latest && dokku deploy api latest"
