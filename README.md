# albatross

This is a web application to help beginners with bird watching. The repository name 'albatross' is a codename and is not related to the application's functionality.

## Getting Started

This project uses Docker for its development environment.

### 1. Start the Development Container

Start the Docker containers in detached mode.
```sh
docker compose -f ./.devcontainer/compose.yaml up -d
```

Wait for the container to start up, then execute a bash shell in the `albatross-app` container.
```sh
docker exec -it albatross-app bash
```

### 2. Initialize the Project

All subsequent commands in the "Getting Started" section should be run inside the container.

Install dependencies.
```sh
bun install
```

Change the owner of the project directory.
```sh
sudo chown -R dev-user:dev-user /home/dev-user
```

### 3. Set up the Local Database

Set up the local database for development. This command applies migrations and runs seed scripts.
```sh
bun run db:setup
```

### 4. Start the Development Server

Start the Vite dev server.
```sh
bun run dev
```

Open http://localhost:5173 in your browser.

### 5. Other Commands

- Code formatting and static analysis (Biome)
```sh
bun run biome
```

- TypeScript type check (no emit)
```sh
bun run tsc
```

- Unit tests (Bun test runner)
```sh
bun run test
```

- End-to-end tests (Playwright: all browsers)
```sh
bun run e2e
```

## deploy

The following commands should be run from your local machine (not inside the container).

### 1. Set up the Staging Environment on Cloudflare

(Run once) Create the D1 database for the staging environment on Cloudflare.
```sh
bun run db:create:stg
```

After running this command, copy the output `database_id` and update the `wrangler.jsonc` file under `env.staging`.

Apply migrations to the staging database.
```sh
bun run db:migrate:stg
```

Seed the staging database with initial data.
```sh
bun run db:seed:stg
```

### 2. Deploy Web App

Deploy the web application to the staging environment on Cloudflare.
```sh
bun run deploy:stg
```

## Command List

- `bun run dev`: Starts the Vite development server.
- `bun run biome`: Runs Biome for code formatting and static analysis.
- `bun run tsc`: Runs the TypeScript type checker (`--noEmit`).
- `bun run test`: Runs unit tests (`bun test`).
- `bun run e2e`: Runs Playwright end-to-end tests.
- `bun run db:reset`: Resets the development database to its initial state.
- `bun run preview`: Starts the Wrangler development server for previewing the build.
- `bun run deploy:stg`: Deploys the application to the staging environment.
- `bun run deploy:prod`: Deploys the application to the production environment.
