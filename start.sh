#!/bin/bash
DIRECTORY=`dirname $0`
$DIRECTORY/api/deploy.sh

cd $DIRECTORY/www
npm start