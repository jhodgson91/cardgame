#!/bin/bash
DIRECTORY=`dirname $0`
cp $DIRECTORY/Rocket.toml ../release 
cp $DIRECTORY/target/release/cardapi ../release
cp $DIRECTORY/db.sqlite ../release
