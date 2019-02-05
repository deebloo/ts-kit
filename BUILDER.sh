#!/usr/bin/env bash

ACTION=$1
PROJECT=$2

source "packages/$PROJECT/BUILDER.sh"

if type $ACTION 2>/dev/null | grep -q 'function'
then
    $ACTION ${@:3}
else
    echo "Project \"$PROJECT\" does not define builder method \"$ACTION\""
fi
