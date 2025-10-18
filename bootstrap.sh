#!/bin/bash

set -e

# Download and extract MongoDB Compass source code
TAG=v1.47.0
wget "https://github.com/mongodb-js/compass/archive/refs/tags/${TAG}.tar.gz"
tar -xvzf "${TAG}.tar.gz" && mv "compass-${TAG#v}" compass
rm "${TAG}.tar.gz"


export ELECTRON_OVERRIDE_DIST_PATH="/dev/null"
export ELECTRON_SKIP_BINARY_DOWNLOAD=1

cd compass

npm ci --ignore-scripts