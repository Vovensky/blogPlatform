import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReactConfig from 'eslint-plugin-react'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'
import reactHooks from 'eslint-plugin-react-hooks'
import configPrettier from 'eslint-config-prettier'
import reactReduxPlugin from 'eslint-plugin-react-redux'
import reactRefreshPlugin from 'eslint-plugin-react-refresh'

export default [
    {
        name: 'test1',
        ignores: ['node_modules', 'dist'],
        plugins: {
            'react-hooks': reactHooks,
            'react-redux': reactReduxPlugin,
            'react-refresh': reactRefreshPlugin,
            react: pluginReactConfig,
        },
        languageOptions: {
            globals: {
                ...globals.serviceworker,
                ...globals.browser,
                ...globals.node,
                ...globals.es2023,
            },
            parserOptions: {
                ...pluginReactConfig.configs.recommended.parserOptions,
                jsx: true,
            },
        },
        files: ['**/*.{js,mjs,cjs,jsx}'],
        rules: {
            ...configPrettier.rules,
            ...pluginJs.configs.recommended.rules,
            ...pluginReactConfig.configs.recommended.rules,
        },
    },
    eslintPluginPrettier,
]
