#!/bin/bash
set -ex

[ $# -ne 2 ] && echo "Usage: $0 <AWS Account ID> <Image Name>" && exit 1

ACCOUNT_ID=${1}
IMAGE_NAME=${2}

docker build --platform=linux/x86_64 -t "${IMAGE_NAME}:latest" .
aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin ${ACCOUNT_ID}.dkr.ecr.ap-northeast-1.amazonaws.com
IMAGE_ID=$(docker images --format="{{.Repository}} {{.ID}} {{.Tag}}" | grep "^${IMAGE_NAME} " | grep 'latest' | awk '{ print $2 }')
docker tag ${IMAGE_ID} ${ACCOUNT_ID}.dkr.ecr.ap-northeast-1.amazonaws.com/${IMAGE_NAME}:latest
docker push  ${ACCOUNT_ID}.dkr.ecr.ap-northeast-1.amazonaws.com/${IMAGE_NAME}:latest
