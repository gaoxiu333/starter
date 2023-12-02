import { defineConfig } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";

import pkg from "./package.json" assert { type: "json" };

const formats = ["es", "amd", "cjs", "iife", "umd", "system"];

export default defineConfig({
  input: "./src/index.ts",
  output: formats.map((format) => {
    return {
      file: `dist/bundletest.${format}.js`,
      format: format,
      // sourcemap: true, // 开启 sourcemap
      // inlineDynamicImports: true, // 将动态导入的资源打包
      // globals: {      // 全局变量
      //   lodash: "_",
      // },
    };
  }),
  plugins: [
    /**
     * nodeResolve + commonjs：
     * 1. nodeResolve 解析模块依赖
     * 2. commonjs 将模块转换为为 ES 模块
     */
    nodeResolve({
      moduleDirectories: ["node_modules"], // 指定 node_modules 目录
    }),
    commonjs(),
    json(),
    typescript({
      tsconfig: "tsconfig.json",
    }),
  ],
  // 排除打包的模块
  external: Object.keys(pkg.dependencies),
});
