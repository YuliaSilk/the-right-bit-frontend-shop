/* eslint-env node */
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import {fileURLToPath} from "url";
import svgr from "vite-plugin-svgr";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({mode}) => {
 /* global process */
 const isVercel = !!process.env.VERCEL;
 const isProd = mode === "production";

 return {
  base: isProd && isVercel ? "/" : "/online-store-frontend/",
  plugins: [react(), svgr()],
  resolve: {
   alias: {
    "@": path.resolve(__dirname, "./src"),
    "@components": path.resolve(__dirname, "./src/components"),
    "@assets": path.resolve(__dirname, "./src/assets"),
    "@pages": path.resolve(__dirname, "./src/pages"),
    "@mocks": path.resolve(__dirname, "./src/mocks"),
    "@context": path.resolve(__dirname, "./src/context"),
    "@utils": path.resolve(__dirname, "./src/utils"),
   },
  },
  build: {
   rollupOptions: {
    output: {
     manualChunks: {
      vendor: ["react", "react-dom"],
      router: ["react-router-dom"],
      carousel: ["react-slick", "slick-carousel"],
     },
    },
   },
   chunkSizeWarningLimit: 1000,
   assetsInlineLimit: 4096,
  },
  assetsInclude: ["**/*.webp", "**/*.avif"],
  optimizeDeps: {
   include: ["react", "react-dom"],
  },
 };
});

// import {defineConfig} from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";
// import {fileURLToPath} from "url";
// import svgr from "vite-plugin-svgr";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // https://vite.dev/config/
// export default defineConfig({
//  base: process.env.NODE_ENV === "production" && process.env.VERCEL ? "/" : "/online-store-frontend/",
//  plugins: [react(), svgr()],

//  resolve: {
//   alias: {
//    "@": path.resolve(__dirname, "./src"),
//    "@components": path.resolve(__dirname, "./src/components"),
//    "@assets": path.resolve(__dirname, "./src/assets"),
//    "@pages": path.resolve(__dirname, "./src/pages"),
//    "@mocks": path.resolve(__dirname, "./src/mocks"),
//    "@context": path.resolve(__dirname, "./src/context"),
//    "@utils": path.resolve(__dirname, "./src/utils"),
//   },
//  },
//  build: {
//   rollupOptions: {
//    output: {
//     manualChunks: {
//      vendor: ["react", "react-dom"],
//      router: ["react-router-dom"],
//      carousel: ["react-slick", "slick-carousel"],
//     },
//    },
//   },
//   chunkSizeWarningLimit: 1000,
//   assetsInlineLimit: 4096, // Inline small assets
//  },
//  assetsInclude: ["**/*.webp", "**/*.avif"],
//  optimizeDeps: {
//   include: ["react", "react-dom"],
//  },
//  define: {
//   "process.env": {
//    NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development"),
//    VERCEL: JSON.stringify(process.env.VERCEL || false),
//   },
//  },
// });
