# Next.js Starter Template

[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.3-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC.svg)](https://tailwindcss.com/)
[![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3.svg)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-3.5-F7B93E.svg)](https://prettier.io/)
[![pnpm](https://img.shields.io/badge/pnpm-9.15-orange.svg)](https://pnpm.io/)

## 🚀 Overview

A modern, production-ready Next.js starter template with the latest frontend technologies and best practices. This template is designed to accelerate development while maintaining high code quality standards and developer experience.

## ✨ Features

- **Next.js 15.3** with App Router and Server Components
- **React 19** with latest features and improvements
- **TypeScript 5** for type safety and better developer experience
- **Tailwind CSS 4** for utility-first styling with the latest features
- **ESLint 9** with Next.js configuration for code quality
- **Prettier** with Tailwind plugin for consistent code formatting
- **Husky & lint-staged** for pre-commit hooks
- **Conventional commits** with commitlint for standardized commit messages
- **pnpm** for fast, disk space efficient package management
- **Turbopack** enabled for faster development experience

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15.3 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript 5

### Development Tools

- **Package Manager**: pnpm
- **Linting**: ESLint 9 with Next.js configuration
- **Formatting**: Prettier with Tailwind plugin
- **Git Hooks**: Husky
- **Commit Standards**: Commitlint with Conventional Commits

## 📋 Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm 9.15 or later

### Installation

```bash
# Clone the repository
git clone https://github.com/jacktseng0704/nextjs-starter-template.git
cd nextjs-starter-template

# Install dependencies
pnpm install
```

### Development

```bash
# Start development server with Turbopack
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

```bash
# Create production build
pnpm build

# Start production server
pnpm start
```

## 🧪 Code Quality

This template enforces high code quality standards through:

- **TypeScript** for static type checking
- **ESLint** for code quality rules
- **Prettier** for consistent formatting
- **Husky** for pre-commit hooks that run:
  - Linting with automatic fixes when possible
  - Code formatting
  - Commit message validation

## 📝 Commit Convention

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification for creating an explicit commit history. Commit messages are enforced using commitlint.

Examples of commit messages:

- `feat(auth): add login component`
- `fix(api): resolve user data fetching issue`
- `docs: update README with new instructions`
- `style: format code with prettier`
- `refactor(components): improve button reusability`

## 🚀 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com), the platform from the creators of Next.js.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fnextjs-starter-template)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
