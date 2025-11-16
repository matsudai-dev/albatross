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
- `"noUncheckedIndexedAccess": true` is configured in TypeScript, so indexed elements may be `undefined`. In test code that doesn't handle `undefined`, throw an error explicitly

## GitHub MCP Server integration
This project can be accessed via GitHub MCP Server for AI agents.
The host OS has GitHub MCP Server configured with a personal access token, which is available for use.

### Repository information
- Owner: matsudai-dev
- Repository: albatross
- Default branch: main

### Working with GitHub
For all GitHub operations (creating issues, pull requests, searching code, etc.), use the GitHub MCP Server tools and `gh` command.
The MCP Server provides access to repository information, issue management, and code search capabilities.
The host OS has `gh` CLI installed with access token configured.

#### Creating issues
- Query the MCP Server for repository context and existing patterns
- Use clear, descriptive titles starting with a verb (e.g., "Add", "Fix", "Update")
- Structure the description with:
    - **Context**: Background and motivation
    - **Requirements**: Specific implementation details
    - **Acceptance Criteria**: Testable outcomes
- Reference existing code patterns when relevant
- Apply appropriate labels: `bug`, `enhancement`, `documentation`, `question`, etc.

#### Working on an issue
1. Create and checkout a new branch named `feature/#n` from the `main` branch (where `#n` is the issue number)
2. Implement following the TDD practices described above
3. Create a pull request using `gh` command (do not use browser)
    - Example: `gh pr create --title "..." --body "..." --base main --head feature/#n`
