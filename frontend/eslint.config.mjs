import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import { includeIgnoreFile } from '@eslint/compat';
import { defineConfig, globalIgnores } from 'eslint/config';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import stylistic from '@stylistic/eslint-plugin'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});
const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url));

export default defineConfig([
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  stylistic.configs.recommended,

  includeIgnoreFile(gitignorePath, 'Imported .gitignore patterns'),
  globalIgnores([
    '*.config.*',
  ]),
])
