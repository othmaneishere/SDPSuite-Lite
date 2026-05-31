# Project Instructions: SDP Suite Lite

## Coding Standards

- **Linter**: ESLint is mandatory. Run `npm run lint` before committing.
- **Formatter**: Prettier is used for all files. Run `npm run format` to ensure consistency.
- **Type Safety**: TypeScript must be strictly followed. Avoid `any`. Run `npm run type-check`.
- **Commit Messages**: Use [Conventional Commits](https://www.conventionalcommits.org/).
  - Format: `<type>(<scope>): <subject>`
  - Example: `feat(workspace): add new local storage feature`

## Architecture & Workflows

- **Framework**: React (TypeScript) with Vite.
- **Styling**: TailwindCSS via `@tailwindcss/vite`.
- **Data Persistence**: Local Storage only. All data is saved on the user's device.

## Reliability

- Always use `ErrorBoundary` for major UI components.
- Validate all user inputs.

For detailed guidelines, see `GUIDELINES.md`.
