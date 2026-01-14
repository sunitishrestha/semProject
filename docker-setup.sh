#!/bin/bash

set -e

echo "🐳 Node.js + PostgreSQL Docker Setup"
echo "====================================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.docker.example..."
    cp .env.docker.example .env
    echo "⚠️  IMPORTANT: Edit .env and change JWT secrets before running in production!"
    echo ""
fi

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose not found. Please install Docker Compose first."
    exit 1
fi

echo "✓ Docker installed"
echo ""

# Ask for environment
echo "Select environment:"
echo "1) Development (with hot reload)"
echo "2) Production"
read -p "Enter choice [1-2]: " choice

case $choice in
    1)
        echo ""
        echo "🚀 Starting development environment..."
        echo ""
        docker-compose -f docker-compose.dev.yml up -d
        
        echo ""
        echo "⏳ Waiting for services to be healthy..."
        sleep 10
        
        echo ""
        echo "🔄 Running migrations..."
        docker-compose -f docker-compose.dev.yml exec app npx sequelize-cli db:migrate
        
        echo ""
        echo "✅ Development environment ready!"
        echo ""
        echo "Services running:"
        echo "  - API: http://localhost:3000"
        echo "  - PostgreSQL: localhost:5432"
        echo "  - Redis: localhost:6379"
        echo ""
        echo "Useful commands:"
        echo "  - View logs: docker-compose -f docker-compose.dev.yml logs -f"
        echo "  - Stop: docker-compose -f docker-compose.dev.yml down"
        echo "  - Rebuild: docker-compose -f docker-compose.dev.yml up -d --build"
        ;;
    2)
        echo ""
        echo "🚀 Starting production environment..."
        echo ""
        
        # Build images
        echo "📦 Building Docker images..."
        docker-compose build
        
        # Start services
        echo "🎬 Starting services..."
        docker-compose up -d
        
        echo ""
        echo "⏳ Waiting for services to be healthy..."
        sleep 15
        
        # Run migrations
        echo ""
        echo "🔄 Running migrations..."
        docker-compose --profile migration run --rm migrate
        
        echo ""
        echo "✅ Production environment ready!"
        echo ""
        echo "Services running:"
        echo "  - API: http://localhost:3000"
        echo "  - PostgreSQL: localhost:5432"
        echo "  - Redis: localhost:6379"
        echo ""
        echo "Useful commands:"
        echo "  - View logs: docker-compose logs -f"
        echo "  - Stop: docker-compose down"
        echo "  - Restart: docker-compose restart"
        echo "  - View status: docker-compose ps"
        ;;
    *)
        echo "Invalid choice. Exiting."
        exit 1
        ;;
esac

echo ""
echo "📊 Container status:"
docker-compose ps 2>/dev/null || docker-compose -f docker-compose.dev.yml ps
