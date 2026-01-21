# Kuantica API

A layered Node.js REST API for Kuantica services including Commercial, Executive, and Marketing modules. Built with Express, PostgreSQL, and Docker.

## Architecture

- **Routes**: Endpoints and middleware definitions in `src/routes`.
- **Controllers**: Request validation and response formatting in `src/controllers`.
- **Services**: Business logic in `src/services`.
- **Repositories**: Data access layer (SQL) in `src/repositories`.
- **Utils**: Shared helpers (e.g., cursor pagination, API response wrapper).

## Prerequisites

- Docker & Docker Compose
- Node.js 18+ (for local development)
- AWS CLI (for deployment)

## Quick Start (Local Development)

1.  **Configure environment:**
    ```bash
    cp .env.example .env
    ```
    Update `.env` with your local database credentials and `API_TOKEN`.

2.  **Start with Docker:**
    ```bash
    docker compose up --build
    ```
    The API will be available at `http://localhost:3000`.

## Authentication

This API uses Bearer Token authentication.
Include the token defined in your `API_TOKEN` environment variable in the `Authorization` header:

```
Authorization: Bearer <YOUR_API_TOKEN>
```

## Documentation

- **Swagger UI**: Interactive documentation is available at `http://localhost:3000/api-docs` (when running locally).
- **JSON Examples**: See `api_responses.json` for detailed response field examples.
- **SQL Indices**: See `indices.sql` for recommended database indices.

## Endpoints

### Public
- `GET /health` - API Health check (No Auth required).

### Commercial Module
- `GET /commercial/fct_funnel_diario` - Daily Funnel Report.
- `GET /commercial/fct_reservas_atribuidas` - Attributed Reservations.

### Executive Module
- `GET /executive/health` - Module Health Check.
- `GET /executive/rpt_gestion_diaria` - Daily Management Report.

### Marketing Module
- `GET /marketing/health` - Module Health Check.
- `GET /marketing/fct_contactos_diarios` - Daily Contact Metrics.
- `GET /marketing/fct_inversion_diaria` - Daily Investment Metrics.

## Database Schema

The API is built around the following main tables:

### Commercial
- **`commercial.fct_funnel_diario`**: Daily funnel metrics.
- **`commercial.fct_reservas_atribuidas`**: Reservation attribution.

### Executive
- **`executive.rpt_gestion_diaria`**: High-level management KPIs.

### Marketing
- **`marketing.fct_contactos_diarios`**: Daily contact tracking.
- **`marketing.fct_inversion_diaria`**: Ad spend tracking.

## Deployment

The project is deployed to **AWS Lightsail Container Services**.

### Powershell Deployment Script

The following commands build the image, push it to Lightsail with a timestamped label, and update the deployment using the `fzamorano-nubonex` profile.

```powershell
# 1. Build Docker Image
docker build -t kuantica-api:latest .

# 2. Generate Timestamp Label
$label = "kuantica-api-" + (Get-Date -Format "yyyyMMdd-HHmm")

# 3. Push to AWS Lightsail
aws lightsail push-container-image `
  --profile fzamorano-nubonex `
  --region us-east-1 `
  --service-name reportin-layer `
  --label $label `
  --image kuantica-api:latest `
  --no-cli-pager

# 4. Create/Update Deployment
# NOTE: Ensure 'containers.json' image references the new label/image if not using :latest behavior in the configuration
aws lightsail create-container-service-deployment `
  --profile fzamorano-nubonex `
  --region us-east-1 `
  --service-name reportin-layer `
  --containers file://containers.json `
  --public-endpoint file://public-endpoint.json `
  --no-cli-pager
```

### Configuration Files

- **`Dockerfile`**: Node.js 20 Alpine image definition.
- **`containers.json`**: Service configuration (verify the `image` field matches the pushed image tag).
- **`public-endpoint.json`**: Public URL mapping (port 3000).
