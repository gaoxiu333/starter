import { defineConfig } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

import pkg from "./package.json" assert { type: "json" };

const formats = ["es", "amd", "cjs", "iife", "umd", "system"];

export default defineConfig({
  input: "./src/test.js",
  output: formats.map((format) => {
    return {
      file: `dist/bundletest.${format}.js`,
      format: format,
    };
  }),
  plugins: [
    /**
     * nodeResolve + commonjs：
     * 1. nodeResolve 解析模块依赖
     * 2. commonjs 将模块转换为为 ES 模块
     */
    nodeResolve(),
    commonjs(),
  ],
  // 排除打包的模块
  external: Object.keys(pkg.devDependencies),
});
