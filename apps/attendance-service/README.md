## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Attendance Service

Attendance microservice for the daycare distributed system.  
It provides check-in and check-out operations and stores attendance records.

---

## Requirements

- Node.js (recommended 18+)
- Docker + Docker Compose (for local/QA environment)
- k6 (for load testing) — optional but recommended
- PowerShell (Windows) for functional testing examples below

---

## Run the service (Local / QA)

> This repository uses Docker Compose to run microservices locally.
> Make sure your local environment is running and the attendance-service port is exposed.

### 1) Start the environment
From the repository root:

```bash
docker compose -f docker-compose.qa.yml up -d

````````Functional Testing (documentado con Swagger + curl)

Invoke-RestMethod `
  -Uri "http://localhost:3002/attendance/check-in" `
  -Method POST `
  -ContentType "application/json" `
  -Body (@{
    childId = "child-001"
    checkedInBy = "staff-01"
  } | ConvertTo-Json)


Invoke-RestMethod `
  -Uri "http://localhost:3002/attendance/ba0cf72e-a47f-4cb4-9efb-46882047a6df/check-out" `
  -Method POST `
  -ContentType "application/json" `
  -Body (@{
    checkedOutBy = "staff-01"
  } | ConvertTo-Json)


------------------ k6 
PS C:\Users\USUARIO\Desktop\daycare-distributed-system> k6 run apps/attendance-service/test/load/attendance-checkin.k6.js 