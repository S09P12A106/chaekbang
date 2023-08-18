#!/bin/bash
DOCKER_APP_NAME=prod-application
BUILD_NUMBER=$1
PREV_BUILD_TAG=$2

# Blue 를 기준으로 현재 떠있는 컨테이너를 체크한다.
EXIST_BLUE=$(docker compose -p ${DOCKER_APP_NAME}-blue -f docker-compose.prodblue.yml ps | grep Up)
 
# 컨테이너 스위칭
if [ -z "$EXIST_BLUE" ]; then
    echo "blue up"
    docker compose -p ${DOCKER_APP_NAME}-blue -f docker-compose.prodblue.yml up -d
    BEFORE_COMPOSE_COLOR="green"
    AFTER_COMPOSE_COLOR="blue"
else
    echo "green up"
    docker compose -p ${DOCKER_APP_NAME}-green -f docker-compose.prodgreen.yml up -d
    BEFORE_COMPOSE_COLOR="blue"
    AFTER_COMPOSE_COLOR="green"
fi
 
sleep 10
 
# 새로운 컨테이너가 제대로 떴는지 확인
EXIST_AFTER=$(docker compose -p ${DOCKER_APP_NAME}-${AFTER_COMPOSE_COLOR} -f docker-compose.prod${AFTER_COMPOSE_COLOR}.yml ps | grep Up)
if [ -n "$EXIST_AFTER" ]; then

    # nginx.config를 컨테이너에 맞게 변경
    docker exec -i nginx-prod cp proxy/nginx.${AFTER_COMPOSE_COLOR}.conf /etc/nginx/nginx.conf

    # nginx reload
    docker exec -i nginx-prod nginx -s reload

    # 이전 컨테이너 종료
    docker compose -p ${DOCKER_APP_NAME}-${BEFORE_COMPOSE_COLOR} -f docker-compose.prod${BEFORE_COMPOSE_COLOR}.yml down
    
    echo "$BEFORE_COMPOSE_COLOR down"

fi


EXIST_PREV=$(docker images --filter=reference="joslynn/prod-spring-app:${PREV_BUILD_TAG}" | grep ${PREV_BUILD_TAG})

if [ -n "$EXIST_PREV" ]; then
    docker rmi joslynn/prod-spring-app:${PREV_BUILD_TAG}
fi