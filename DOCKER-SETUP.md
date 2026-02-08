# Docker Setup for AutoProof 🐳

## Quick Start

### 1. Build and Run with Docker Compose

```bash
# Build and start containers
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop containers
docker-compose down
```

Access the app at: **http://localhost:3000**

---

## Manual Docker Commands

### Build Frontend Image
```bash
cd frontend
docker build -t autoproof-frontend .
```

### Run Frontend Container
```bash
docker run -p 3000:3000 autoproof-frontend
```

---

## Configuration

### Environment Variables

Update `.env.docker` with your contract address:

```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourDeployedContractAddress
```

Then run:
```bash
docker-compose --env-file .env.docker up
```

---

## Development vs Production

### Development Mode
For hot-reloading during development:

```yaml
# In docker-compose.yml, keep the volumes section:
volumes:
  - ./frontend:/app
  - /app/node_modules
  - /app/.next
```

### Production Mode
For production, remove volumes to use the built image:

```yaml
# Remove the volumes section for production
# frontend:
#   build: ./frontend
#   ports:
#     - "3000:3000"
```

---

## Docker Commands Cheat Sheet

```bash
# View running containers
docker ps

# View logs
docker-compose logs -f frontend

# Restart services
docker-compose restart

# Remove all containers and volumes
docker-compose down -v

# Rebuild without cache
docker-compose build --no-cache

# Execute command in running container
docker-compose exec frontend sh
```

---

## Troubleshooting

### Port Already in Use
```bash
# Change port in docker-compose.yml
ports:
  - "3001:3000"  # Use port 3001 instead
```

### Build Fails
```bash
# Clear Docker cache
docker system prune -a

# Rebuild
docker-compose build --no-cache
```

### SSL Certificate Issues
The Dockerfile already includes `npm config set strict-ssl false` during build to handle certificate issues.

---

## Deployment

### Deploy to Cloud Platforms

**Docker Hub:**
```bash
docker tag autoproof-frontend yourusername/autoproof-frontend
docker push yourusername/autoproof-frontend
```

**AWS ECS / Azure / GCP:**
Use the `docker-compose.yml` or individual Dockerfile for deployment.

---

## What's Included

✅ **Multi-stage Docker build** - Optimized for production  
✅ **Docker Compose** - Easy orchestration  
✅ **Environment configuration** - Easy config management  
✅ **SSL certificate handling** - Works behind corporate proxies  
✅ **Health checks** - Container monitoring ready  

---

## Next Steps

1. Update contract address in `.env.docker`
2. Run `docker-compose up --build`
3. Visit http://localhost:3000
4. Connect MetaMask and test!

Your AutoProof app is now containerized! 🚀
