#!/bin/bash

R='\033[0;31m'
G='\033[0;32m'
Y='\033[1;32m'
B='\033[0;34m'

isNodeInstalled() {
    if type node > /dev/null 2>&1 && which node > /dev/null 2>&1 ;then
        return 0
    else
        return 1
    fi
}

isNpmInstalled() {
    if [ `npm list -g | grep -c live-server` -eq 0 -o ! -d node_module ];then
        return 0
    else
        return 1
    fi
}

if isNodeInstalled && isNpmInstalled;then
    echo -e "${G}node version:"
        node -v
    echo -e "${G}npm version:"
        npm -v
    npm run dev
else 
    echo -e "${B}Please check if node is installed..."
    echo -e "${B}Then check npm if live-server package is available..."
fi

