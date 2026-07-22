import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Per-frame imperative mutation (useFrame / rAF writing to three.js
    // uniforms, transforms and DOM styles) is the correct pattern for the
    // WebGL and animation layer; these compiler-oriented rules reject it.
    files: ["src/three/**", "src/components/**", "src/motion/**"],
    rules: {
      "react-hooks/immutability": "off",
      "react-hooks/use-memo": "off",
      "react-hooks/refs": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
