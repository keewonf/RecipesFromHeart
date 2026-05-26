import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  format: ["cjs"],
  target: "node22",
  clean: true,
  sourcemap: true,
  dts: false,
  splitting: false,
  outDir: "dist",
});
