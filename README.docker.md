# Docker Setup

## Quick Start

### Using Docker Compose (Recommended)
```bash
docker-compose up
```

### Using Docker directly
```bash
# Build the image
docker build -t sianglao-frontend .

# Run the container
docker run -p 3000:3000 sianglao-frontend
```

## Environment Variables

- `NUXT_PUBLIC_API_BASE_URL` - Backend API URL (default: http://localhost:5005)

## Development

The app runs on http://localhost:3000 with hot-reload enabled via volume mounts in docker-compose.yml.