import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  server: {
    port: 5175,
  },
  plugins: [react()],
  base: "./",
  //   build: {
  //     rollupOptions: {
  //       output: {
  //         manualChunks: {
  //           "react-vendor": ["react", "react-dom"],
  //           "mantine-ui": ["@mantine/core", "@mantine/hooks"],
  //           "react-query": ["@tanstack/react-query"],
  //         },
  //       },
  //     }
  // ,
  build: {
    minify: false,
  },
});
