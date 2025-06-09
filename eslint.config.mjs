import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  // Custom rules and settings
  {
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.js built-ins
            'external', // External packages
            'internal', // Internal modules
            'parent', // Parent directories
            'sibling', // Sibling modules
            'index', // Index files
            'object', // Imports of objects
          ],
          'newlines-between': 'always',
          distinctGroup: true,
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
]

export default eslintConfig
