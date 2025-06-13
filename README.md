# Masonry Photo Wall

[![Next.js](https://img.shields.io/badge/Next.js-15.3-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC.svg)](https://tailwindcss.com/)
[![React Query](https://img.shields.io/badge/React%20Query-v5-FF4154.svg)](https://tanstack.com/query/latest)
[![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3.svg)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-3.5-F7B93E.svg)](https://prettier.io/)
[![pnpm](https://img.shields.io/badge/pnpm-9.15-orange.svg)](https://pnpm.io/)

**Live Demo:** [Link to your deployed application] (e.g., Vercel, Netlify)

## 🌟 Project Overview

The Masonry Photo Wall is a dynamic and visually engaging web application designed to showcase a collection of photos in a responsive masonry layout. It features infinite scrolling for seamless browsing and client-side filtering by author, built with a modern, performant, and maintainable tech stack. This project demonstrates best practices in frontend development, including efficient data fetching, state management, image optimization, and accessibility.

## ✨ Key Features

- **Responsive Masonry Layout**: Utilizes the `masonic` library to render photos in a Pinterest-style grid that adapts beautifully to various screen sizes, ensuring optimal use of space and visual appeal.
- **Infinite Scrolling**: Implements an infinite scroll mechanism using the `IntersectionObserver` API, allowing users to effortlessly load more photos as they scroll, providing a smooth and continuous browsing experience.
- **Client-Side Author Filtering**: Enables users to instantly filter the photo gallery by author name. Filtering logic is performed client-side for a snappy user experience, with `useMemo` optimizing re-renders.
- **Performance Optimized**:
  - **Next.js App Router**: Leverages Server Components for initial data fetching (prefetching with React Query) and optimized server-side rendering.
  - **Dynamic Component Loading**: The `MasonryGrid` component is loaded dynamically (`next/dynamic`) to reduce the initial bundle size and improve page load performance.
  - **Image Optimization**: Employs `next/image` for automatic image optimization, lazy loading, and serving appropriately sized images based on the viewport (`sizes` prop).
  - **Skeleton Loaders**: Displays `MasonryGridSkeleton` during initial data load and a loading indicator for subsequent loads, enhancing perceived performance and user experience.
- **Efficient Data Fetching & State Management**:
  - **React Query (TanStack Query)**: Manages server state, handling asynchronous data fetching, caching, and background updates for a robust and resilient data layer.
  - **Custom Hooks**: Encapsulates data fetching and state logic (e.g., `usePhotos`) for better separation of concerns and reusability.
- **Accessibility (A11y)**: Incorporates ARIA attributes (`aria-label`, `aria-live`, `role`, `sr-only` text) and semantic HTML to ensure the application is usable by a wider range of users, including those relying on assistive technologies.
- **Robust Error Handling**: Features a dedicated error page (`error.tsx`) and inline error messages within components to gracefully handle and inform users about issues.
- **Modern Tech Stack & DX**: Built with Next.js 15, React 19, TypeScript 5, and Tailwind CSS 4. Enforced code quality with ESLint, Prettier, Husky, and Conventional Commits for a superior developer experience.

## 🛠️ Technical Deep Dive

### Architecture & Design Choices

- **Framework**: **Next.js 15 (App Router)** was chosen for its hybrid rendering capabilities (Server Components, Client Components), optimized performance features (image optimization, code splitting), and streamlined routing. Prefetching data on the server using React Query within Server Components ensures a fast initial load.
- **UI Library**: **React 19** provides a powerful component-based architecture.
- **Styling**: **Tailwind CSS 4** enables rapid UI development with a utility-first approach, ensuring consistency and maintainability.
- **State Management**:
  - **React Query**: Selected for managing server state due to its powerful caching, automatic refetching, and simplified handling of loading/error states. This significantly reduces boilerplate for asynchronous operations.
  - **React Hooks (`useState`, `useMemo`, `useEffect`)**: Used for local component state and derived state computations (e.g., client-side filtering).
- **Masonry Layout**: The **`masonic` library** was chosen over custom solutions or other alternatives due to its high performance with large datasets (virtualization), ease of integration, and robust feature set for creating responsive masonry grids. The `key` prop on the `Masonry` component is strategically updated with `authorFilter` to ensure the layout correctly re-renders or resets when the filter criteria change.
- **Infinite Scrolling**: Implemented with the **`IntersectionObserver` API** for its efficiency in detecting element visibility without performance overhead associated with scroll event listeners.
- **Component Structure**:
  - `PhotoGallery.tsx`: Orchestrates the main view, including the filter input and the `MasonryGrid`.
  - `MasonryGrid.tsx`: Handles the display of photos using `masonic` and manages the infinite scroll trigger.
  - `PhotoCard.tsx`: A presentational component for individual photos, utilizing `next/image`.
  - `MasonryGridSkeleton.tsx`: Provides a visually appealing loading state.
- **Error Handling**: A global error boundary (`error.tsx` in Next.js App Router) catches runtime errors, displaying a user-friendly message and offering a way to retry or navigate home. Component-level error states (e.g., from `usePhotos` hook) are handled inline.

## 📋 Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm 9.15 or later (or your preferred package manager: npm, yarn)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/masonry-photo-wall.git # Replace with your repo URL
    cd masonry-photo-wall
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

### Development

Run the development server (with Turbopack for Next.js):

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
