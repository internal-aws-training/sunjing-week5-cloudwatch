#!/bin/bash

cd $(dirname $0)/..

BUCKET_NAME=sj-lambda-code
#BUCKET_NAME=sj-learning-aws-code
TEMPLATE=template-basic-alarm
NAME=week5

echo "package ..."
aws cloudformation \
  package \
  --region ap-southeast-2 \
  --template-file ./aws/${TEMPLATE}.yml \
  --s3-bucket ${BUCKET_NAME} \
  --output-template-file ${TEMPLATE}.yml

echo "deploy stack: ${TEMPLATE}, stack name is ${NAME}"
aws cloudformation deploy\
  --stack-name ${NAME}\
  --template-file ./${TEMPLATE}.yml\
  --region ap-southeast-2\
  --capabilities CAPABILITY_IAM
