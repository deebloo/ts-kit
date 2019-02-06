#!/usr/bin/env bash

ACTION=$1
PROJECT=$2

if [ -z "$PROJECT" ]
then
    for DIR in `find ./packages -mindepth 1 -maxdepth 1 -type d`
    do
        ./BUILDER.sh "$ACTION" $(basename "$DIR")
    done
else
    source "packages/$PROJECT/BUILDER.sh"
    
    if type $ACTION 2>/dev/null | grep -q 'function'
    then
        $ACTION ${@:3}
    else
        echo "Project \"$PROJECT\" does not define builder method \"$ACTION\""
    fi
fi