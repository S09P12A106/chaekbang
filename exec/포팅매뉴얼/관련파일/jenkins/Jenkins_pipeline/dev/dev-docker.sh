#!/bin/bash
DOCKER_APP_NAME=dev-application
BUILD_TAG=$1


# Blue 를 기준으로 현재 떠있는 컨테이너를 체크한다.
EXIST_BLUE=$(docker compose -p ${DOCKER_APP_NAME}-blue -f docker-compose/docker-compose.devblue.yml ps | grep Up)


# spring profile 변경
if [ -z "$EXIST_BLUE" ]; then
    echo "blue image push"
    docker build -t joslynn/dev-spring-app:${BUILD_TAG} --build-arg PROFILE=devBlue .

else
    echo "green image push"
    docker build -t joslynn/dev-spring-app:${BUILD_TAG} --build-arg PROFILE=devGreen .

fi

