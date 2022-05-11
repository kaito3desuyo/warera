import path from "path";
import swc from "unplugin-swc";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      name: "Warera",
      formats: ["umd"],
      fileName: (format) => `warera.${format}.js`,
    },
    minify: "terser",
    sourcemap: true,
  },
  plugins: [swc.vite()],
});
