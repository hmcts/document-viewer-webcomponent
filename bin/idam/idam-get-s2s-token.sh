#!/bin/sh
echo $(curl -s  -H 'Content-Type: application/json' -d '{"microservice":"'${1}'"}' ${2}/testing-support/lease)


