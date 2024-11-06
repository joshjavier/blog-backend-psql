# blog-backend-psql

## Table of Contents

- [About](#about)
- [Getting Started](#getting-started)
<!-- - [Usage](#usage) -->
<!-- - [Contributing](../CONTRIBUTING.md) -->

## About

This repo contains the 24 exercises I completed for Part 13 of the Full Stack Open.

## Getting Started

I've set up this project for local development using a Docker container for the PostgreSQL database.

### Prerequisites

- Node.js
- Docker

### Installing

First, start a postgres instance using Docker:

```sh
docker run --name blog-backend-psql -e POSTGRES_PASSWORD=plusultra -p 5432:5432 -d postgres
```

- `--name blog-backend-psql` - sets the name of the docker container
- `-e POSTGRES_PASSWORD=plusultra` - sets the password of the superuser (which by default is `postgres`)
- `-p 5432:5432` - exposes the port, so we can access the database at `localhost:5432`
- `postgres` - selects the `postgres` database

Once you have a postgres instance running, install the project dependencies and run the app:

```sh
npm install
npx nodemon index.js
```

<!-- ## Usage

Add notes about how to use the system. -->
