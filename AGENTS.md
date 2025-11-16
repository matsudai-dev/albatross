# AGENTS.md

## About this file
This file provides instructions and context for AI agents.
Please reference this before starting any work on this project.

## Project overview
A web application for bird watching beginners

## Test commands
Run the following command from the host machine:
```bash
docker exec -it albatross-app bash -c "bun run check"
```

Then:
- `biome` runs linter and formatter
- `tsc` runs type checking
- `bun test` runs unit tests and component tests

If the container is not running, start it first:
```bash
docker compose -f .devcontainer/compose.yaml up -d
```

## Code style guidelines
### TypeScript
- Use tabs for indentation
- Use semicolons
### Markdown
- Use 4 spaces for indentation

## Testing instructions
- This project follows Test-Driven Development (TDD) practices
    1. Define the function name and create a stub that returns a placeholder value
    2. Write test code for the function and run the test command to confirm all tests fail
    3. Implement the function
    4. Run the test command to confirm all tests pass
- Place `{filename}.spec.ts` in the same directory as `{filename}.ts`
- Use `./app/utils/html-parser` for DOM parsing in component tests

## GitHub MCP Server integration
This project can be accessed via GitHub MCP Server for AI agents.

### Repository information
- Owner: matsudai-dev
- Repository: albatross
- Default branch: main

### Available operations
- Search code across the repository
- Read file contents
- Create and manage issues
- Create and review pull requests
- Access commit history and branches

### How to create an issue

- **Title**
    - Use a clear, concise description of the problem or feature
    - Start with a verb (e.g., "Add", "Fix", "Update")
- **Description**
    - Clearly explain the context, requirements, and expected behavior
    - Include steps to reproduce for bugs
    - Include acceptance criteria for features
- **Assignees**
    - Assign to the person responsible for implementation
    - Leave unassigned if seeking volunteers
- **Labels**
    - Use appropriate labels: `bug`, `enhancement`, `documentation`, `question`, etc.
    - Add priority labels if applicable: `priority: high`, `priority: low`

### How to work on an issue

1. Create and checkout a new branch named `feature/#n` from the `main` branch (where `#n` is the issue number)
2. Implement following the TDD practices described above
3. Create a pull request
