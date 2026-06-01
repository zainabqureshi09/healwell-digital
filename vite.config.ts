import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({
      server: {
        entry: "src/server.ts",
      },
    }),
  ],
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (
          warning.code === "MODULE_LEVEL_DIRECTIVE" &&
          (warning.message.includes("use client") || warning.message.includes("use server"))
        ) {
          return;
        }
        warn(warning);
      },
    },
  },
});
