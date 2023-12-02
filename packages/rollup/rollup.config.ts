import typescript from "@rollup/plugin-typescript";

const config: import("rollup").RollupOptions = {
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "cjs",
  },
  plugins: [
    typescript({
      tsconfig: "tsconfig.json",
      sourceMap: false,
    }),
  ],
};
export default config;
