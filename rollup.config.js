import PeerDepsExternalPlugin from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";

import pkg from "./package.json";
import scss from "rollup-plugin-scss";
import postcss from "postcss";
import autoprefixer from "autoprefixer";

import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/lib/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    PeerDepsExternalPlugin(),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    scss({
      processor: () => postcss([autoprefixer()]),
    }),
    json(),
    terser(),
  ],
};
