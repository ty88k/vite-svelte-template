import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { browserslistToTargets } from "lightningcss";
import browserslist from "browserslist";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  // root: "public/",
  build: {
    cssMinify: "lightningcss",
  },
  css: {
    transformer: "lightningcss",
    lightningcss: {
      targets: browserslistToTargets(
        browserslist.loadConfig({ path: "." })
      ),
    },
  },
});
