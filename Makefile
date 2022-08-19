build:
	[ -d "./node_modules/" ] || yarn install
	docker-compose up --build

generate_prisma:
	docker run -it streammm_app npx prisma generate

up:
	docker-compose up
