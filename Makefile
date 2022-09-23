DOCKER_COMPOSE := docker-compose -f docker-compose.yml 

DOCKER_COMPOSE_RUN := $(DOCKER_COMPOSE) run --rm --entrypoint=/bin/sh app -c

build:
	[ -d "REST/node_modules/" ] || cd REST; yarn install
	docker-compose build 
	make generate_prisma 
	make migrate

generate_prisma:
	@$(DOCKER_COMPOSE_RUN) "npx prisma generate"

migrate:
	@$(DOCKER_COMPOSE_RUN) "npx prisma migrate dev"

up:
	docker-compose up

down:
	docker-compose down
