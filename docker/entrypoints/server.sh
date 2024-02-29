#!/bin/bash

npm install

if [ "$1" = "development" ]; then
    npm run lint
    wait
    npm run start:dev
elif [ "$1" = "production" ]; then
    npm run build
    wait
    npm run start
else
    echo "Invalid environment argument. Please use 'development' or 'production'."
fi
