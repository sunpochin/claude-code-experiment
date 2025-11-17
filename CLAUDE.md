# CLAUDE.md - AI Assistant Guide

This document provides comprehensive guidance for AI assistants working with this codebase. It outlines the project structure, development workflows, conventions, and best practices.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Repository Structure](#repository-structure)
3. [Development Environment](#development-environment)
4. [Development Workflows](#development-workflows)
5. [Code Conventions](#code-conventions)
6. [Git Workflow](#git-workflow)
7. [Testing Guidelines](#testing-guidelines)
8. [Common Tasks](#common-tasks)
9. [Troubleshooting](#troubleshooting)

---

## Project Overview

**Current State**: This repository is in its initial setup phase.

**License**: GNU General Public License v3.0 (GPL-3.0)

**Tech Stack** (Inferred from .gitignore):
- JavaScript/TypeScript ecosystem
- Node.js runtime
- Modern bundlers (Vite, Next.js, Nuxt, etc.)

### Project Purpose

This is an experimental repository (`claude-code-experiment`) that appears to be set up for Node.js/JavaScript/TypeScript development.

---

## Repository Structure

```
claude-code-experiment/
├── .git/                 # Git version control
├── .gitignore           # Node.js/JS/TS ignore patterns
├── LICENSE              # GPL-3.0 license
└── CLAUDE.md           # This file - AI assistant guide
```

### Current Files

- **LICENSE**: GNU GPL v3.0 - Copyleft license requiring derivative works to be open source
- **.gitignore**: Comprehensive Node.js/JavaScript/TypeScript patterns including:
  - `node_modules/` - Dependencies
  - Build outputs (`dist/`, `.next/`, `.nuxt/`)
  - Environment files (`.env`, `.env.*`)
  - Cache directories
  - Coverage reports
  - Log files

### Expected Future Structure

As the project develops, expect these typical directories:

```
src/                    # Source code
├── components/         # UI components (if applicable)
├── utils/             # Utility functions
├── services/          # Business logic/API services
└── types/             # TypeScript type definitions

tests/                 # Test files
├── unit/              # Unit tests
├── integration/       # Integration tests
└── e2e/              # End-to-end tests

docs/                  # Documentation
config/                # Configuration files
scripts/               # Build/deployment scripts
public/                # Static assets (if applicable)
```

---

## Development Environment

### Prerequisites

Based on the .gitignore, this project likely requires:

- **Node.js**: LTS version recommended (check for `.nvmrc` or `package.json` engines)
- **Package Manager**: npm, yarn, or pnpm
- **Git**: For version control

### Initial Setup

When the project has a `package.json`, the setup will likely be:

```bash
# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Copy environment template (if exists)
cp .env.example .env

# Run development server (typical)
npm run dev
```

### Environment Variables

The `.gitignore` excludes `.env` files but keeps `.env.example`. When working with environment variables:

1. Never commit actual `.env` files
2. Document all required variables in `.env.example`
3. Use descriptive variable names with prefixes (e.g., `API_`, `DB_`, `NEXT_PUBLIC_`)

---

## Development Workflows

### Branch Strategy

**Current Branch**: `claude/claude-md-mi3j0ifxy8d7f3y5-01GeCqLKK7EmSGXiPExEKnCx`

This repository uses Claude-specific feature branches with the pattern:
- `claude/<description>-<session-id>`

### Creating New Features

1. Work on the designated Claude branch
2. Make incremental commits with clear messages
3. Push to the feature branch when ready
4. Create pull request to main branch

### Code Review Process

When creating pull requests:
1. Ensure all tests pass
2. Update documentation if needed
3. Follow commit message conventions
4. Reference related issues

---

## Code Conventions

### General Principles

1. **Readability**: Code should be self-documenting
2. **Consistency**: Follow established patterns in the codebase
3. **Simplicity**: Prefer simple solutions over clever ones
4. **DRY**: Don't Repeat Yourself - extract reusable logic

### Naming Conventions

**JavaScript/TypeScript:**
- `camelCase` for variables and functions
- `PascalCase` for classes and types/interfaces
- `UPPER_SNAKE_CASE` for constants
- Descriptive names over abbreviations

**Files:**
- `kebab-case.ts` for utility files
- `PascalCase.tsx` for component files (if React)
- `index.ts` for barrel exports

### Code Style

When a linter configuration is added (ESLint, Prettier), follow it strictly:
- Consistent indentation (likely 2 spaces based on JS conventions)
- Semicolons based on project preference
- Single vs double quotes - maintain consistency
- Line length limits
- Trailing commas in multi-line structures

### Comments

```typescript
// Good: Explain WHY, not WHAT
// Cache results to avoid expensive recalculation on re-renders
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

// Bad: Stating the obvious
// Set x to 5
const x = 5;
```

### TypeScript Specific

- Prefer `interface` over `type` for object shapes
- Use strict mode (`strict: true` in tsconfig.json)
- Avoid `any` - use `unknown` or proper types
- Export types alongside implementations

---

## Git Workflow

### Commit Messages

Follow conventional commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(auth): add JWT authentication

Implement JWT-based authentication with refresh tokens.
- Add login/logout endpoints
- Create auth middleware
- Add token refresh mechanism

Closes #123
```

### Git Best Practices

1. **Atomic commits**: Each commit should be a single logical change
2. **Commit frequently**: Small commits are easier to review and revert
3. **Write descriptive messages**: Future you will thank present you
4. **Pull before push**: Stay up to date with remote changes
5. **Don't commit sensitive data**: Check for secrets before committing

### Branch Naming

For manual branch creation (non-Claude sessions):
- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/what-changed` - Documentation updates
- `refactor/what-changed` - Code refactoring

---

## Testing Guidelines

### Test Structure

When tests are added, follow these patterns:

```typescript
describe('ComponentName', () => {
  describe('methodName', () => {
    it('should behave correctly in normal case', () => {
      // Arrange
      const input = setupTestData();

      // Act
      const result = methodName(input);

      // Assert
      expect(result).toBe(expectedValue);
    });

    it('should handle edge case', () => {
      // Test edge cases
    });

    it('should throw error for invalid input', () => {
      // Test error cases
    });
  });
});
```

### Testing Best Practices

1. **Test behavior, not implementation**: Tests should not break when refactoring
2. **One assertion per test**: Or closely related assertions
3. **Clear test names**: Should describe what is being tested
4. **Arrange-Act-Assert**: Organize test code clearly
5. **Mock external dependencies**: Unit tests should be isolated
6. **Test edge cases**: Empty arrays, null values, boundary conditions

### Test Coverage

- Aim for high coverage, but prioritize critical paths
- Don't write tests just to increase coverage percentage
- Focus on business logic and edge cases

---

## Common Tasks

### Adding a New Feature

1. **Planning**
   - Understand requirements
   - Review existing code patterns
   - Identify affected files

2. **Implementation**
   - Create necessary files following naming conventions
   - Write implementation with types
   - Add error handling
   - Update related code

3. **Testing**
   - Write unit tests
   - Write integration tests if needed
   - Manual testing

4. **Documentation**
   - Update README if needed
   - Add JSDoc comments for public APIs
   - Update this CLAUDE.md if conventions change

5. **Review**
   - Self-review code
   - Check for console.logs or debug code
   - Verify no secrets in code
   - Run linter and tests

### Debugging

1. **Check console**: Look for error messages and warnings
2. **Add logging**: Use proper logging (not console.log in production)
3. **Use debugger**: Breakpoints in IDE or browser DevTools
4. **Read stack traces**: Follow the execution path
5. **Check git history**: `git log` and `git blame` for context

### Refactoring

1. **Ensure tests exist**: Write tests first if they don't exist
2. **Make small changes**: Incremental refactoring
3. **Run tests frequently**: After each small change
4. **Commit often**: Easy to revert if needed
5. **Update documentation**: Keep docs in sync

---

## Troubleshooting

### Common Issues

**Dependency Issues:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Or with yarn
rm -rf node_modules yarn.lock
yarn install
```

**Build Issues:**
```bash
# Clear build cache
rm -rf .next       # Next.js
rm -rf .nuxt dist  # Nuxt
rm -rf dist        # Generic

# Rebuild
npm run build
```

**Git Issues:**
```bash
# Discard local changes
git checkout -- <file>

# Undo last commit (keep changes)
git reset --soft HEAD~1

# See what changed
git diff
git status
```

### When to Ask for Help

- Security vulnerabilities detected
- Unclear requirements or specifications
- Breaking changes needed
- Architecture decisions
- Performance optimization strategies

---

## AI Assistant Guidelines

### When Working on This Codebase

1. **Read First**: Always read relevant files before making changes
2. **Understand Context**: Check git history and related files
3. **Follow Patterns**: Match existing code style and structure
4. **Test Changes**: Verify changes work as expected
5. **Document Changes**: Update docs when adding features or changing behavior
6. **Security First**: Never commit secrets, validate inputs, handle errors
7. **Ask When Uncertain**: Clarify requirements rather than assume

### Code Quality Checklist

Before committing:
- [ ] Code follows project conventions
- [ ] No console.logs or debug code
- [ ] Error handling is appropriate
- [ ] Types are properly defined (TypeScript)
- [ ] Comments explain complex logic
- [ ] Tests pass (when they exist)
- [ ] No sensitive data in code
- [ ] Linter passes (when configured)

### Security Considerations

1. **Input Validation**: Always validate user input
2. **Environment Variables**: Use for secrets, never hardcode
3. **Dependencies**: Keep dependencies updated
4. **SQL Injection**: Use parameterized queries
5. **XSS Prevention**: Sanitize output, use framework protections
6. **Authentication**: Implement proper auth/authorization
7. **CORS**: Configure appropriately for your use case

---

## Project Evolution

### As the Project Grows

Update this document when:
- Tech stack is finalized (framework choice, database, etc.)
- Build/test scripts are added
- Deployment process is established
- API patterns are defined
- State management approach is chosen
- Component library is selected

### Documentation Maintenance

Keep this file up to date with:
- New conventions or patterns
- Architecture decisions
- Common pitfalls discovered
- Workflow improvements
- Tool updates

---

## Resources

### License Information

This project uses GPL-3.0. Key points:
- Source code must be provided
- Derivative works must also be GPL-3.0
- Commercial use is allowed
- Can modify and distribute
- No warranty provided

Read full license: [LICENSE](./LICENSE)

### Useful Commands

```bash
# Git
git status                    # Check current state
git log --oneline            # View commit history
git diff                     # See unstaged changes
git branch -a                # List all branches

# Package management (when package.json exists)
npm run                      # List available scripts
npm outdated                 # Check for updates
npm audit                    # Security check

# Development (typical commands)
npm run dev                  # Start dev server
npm run build                # Build for production
npm run test                 # Run tests
npm run lint                 # Run linter
```

---

## Version History

- **2025-11-17**: Initial CLAUDE.md creation
  - Repository structure documented
  - Development workflows defined
  - Code conventions established
  - Git workflow guidelines added

---

**Last Updated**: 2025-11-17
**Maintained By**: AI Assistants working on this project
**Questions**: Refer to repository owner or project documentation
