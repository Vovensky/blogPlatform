import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react";


export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  { languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2023,
      }, 
      parserOptions: {
        ecmaFeatures: { 
          jsx: true 
        }, 
      } 
    } 
  },
  { languageOptions: { 
      globals: globals.browser, 
    }
  },
  pluginJs.configs.recommended,
  pluginReactConfig,
]