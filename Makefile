.PHONY: help dev prod build up down logs migrate migrate-undo clean

help: ## Show this help
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

dev: ## Start development environment
	docker-compose -f docker-compose.dev.yml up -d
	@echo "Waiting for services..."
	@sleep 10
	docker-compose -f docker-compose.dev.yml exec app npx sequelize-cli db:migrate
	@echo "\n✅ Development environment ready at http://localhost:3000"

prod: ## Start production environment
	docker-compose build
	docker-compose up -d
	@echo "Waiting for services..."
	@sleep 15
	docker-compose --profile migration run --rm migrate
	@echo "\n✅ Production environment ready at http://localhost:3000"

build: ## Build production images
	docker-compose build

up: ## Start all services (production)
	docker-compose up -d

down: ## Stop all services
	docker-compose down
	docker-compose -f docker-compose.dev.yml down

down-v: ## Stop all services and remove volumes
	docker-compose down -v
	docker-compose -f docker-compose.dev.yml down -v

logs: ## View logs
	@if docker-compose -f docker-compose.dev.yml ps | grep -q "Up"; then \
		docker-compose -f docker-compose.dev.yml logs -f; \
	else \
		docker-compose logs -f; \
	fi

logs-app: ## View app logs only
	docker-compose logs -f app

logs-worker: ## View worker logs only
	docker-compose logs -f worker

migrate: ## Run database migrations
	docker-compose exec app npx sequelize-cli db:migrate

migrate-undo: ## Undo last migration
	docker-compose exec app npx sequelize-cli db:migrate:undo

shell-app: ## Open shell in app container
	docker-compose exec app sh

shell-db: ## Open PostgreSQL shell
	docker-compose exec postgres psql -U postgres -d starter_db

ps: ## Show running containers
	docker-compose ps

restart: ## Restart all services
	docker-compose restart

clean: ## Remove all containers, volumes, and images
	docker-compose down -v --rmi all
	docker-compose -f docker-compose.dev.yml down -v --rmi all
