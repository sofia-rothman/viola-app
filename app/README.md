# React + TypeScript + Vite

## Getting Started

Install dependencies and run the local Vite server:

```bash
npm install
npm run dev
```

## Quality Checks

Use these scripts before opening or merging changes:

```bash
npm run format:check
npm run lint
npm test
npm run build
```

Use `npm run format` to apply the shared Prettier style.

## Development Workflow

To maintain a clean and stable codebase, this project follows a structured branching strategy. Even as a solo developer, these conventions help track progress and prevent unstable code from reaching the main branch.

### Branch Types

| Branch Prefix | Purpose                                 | Base Branch |
| :------------ | :-------------------------------------- | :---------- |
| `main`        | Production-ready code. Always stable.   | -           |
| `feature/`    | New functionality or improvements.      | `main`      |
| `bugfix/`     | Fixing issues or bugs in the code.      | `main`      |
| `hotfix/`     | Urgent fixes for the production branch. | `main`      |

### How to Contribute (Workflow)

1. **Create a branch:** Use a descriptive name, e.g., `feature/add-user-auth`.

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Commit changes:** Write clear and concise commit messages.

3. **Merge to main:** Once the feature is complete and tested, merge it back to the main branch.
