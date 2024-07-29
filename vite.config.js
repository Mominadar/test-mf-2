import { defineConfig } from "vite";
import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import * as dotenv from "dotenv";
import * as dotenvExpand from "dotenv-expand";

dotenvExpand.expand(dotenv.config());

const remoteAppsMapDev = {
  accessibleTextBooks: "http://127.0.0.1:5001/assets/remoteEntry.js",
  common: "http://127.0.0.1:4175/assets/remoteEntry.js",
  playgroundUi: "http://localhost:4173/assets/remoteEntry.js",
};

const remoteAppsMapProdVercel = {
  accessibleTextBooks:
    "https://accessible-textbooks-orl6mkxwy-mominadars-projects.vercel.app/assets/remoteEntry.js",
  common:
    "https://playground-common-components-2p4q57b8b-mominadars-projects.vercel.app/assets/remoteEntry.js",
  playgroundUi:
    "https://playground-fpexlof24-mominadars-projects.vercel.app/assets/remoteEntry.js",
};

const remoteAppsMapProdS3 = {
  accessibleTextBooks:
    "https://accessible-textbooks-orl6mkxwy-mominadars-projects.vercel.app/assets/remoteEntry.js",
  common:
    "https://playground-common-components-2p4q57b8b-mominadars-projects.vercel.app/assets/remoteEntry.js",
  playgroundUi:
    "https://playground-fpexlof24-mominadars-projects.vercel.app/assets/remoteEntry.js",
};

const remotesApp =
  process.env.NODE_ENV == "development"
    ? remoteAppsMapDev
    : process.env.IS_VERCEL
    ? remoteAppsMapProdVercel
    : remoteAppsMapProdS3;

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "app",
      remotes: {
        ...remotesApp,
        from: "webpack",
        format: "esm",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        format: "esm",
        minifyInternalExports: false,
      },
    },
  },
  output: {
    libraryTarget: "system",
  },
  devServer: {
    allowedHosts: "all",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
    proxy: {
      "*": {
        changeOrigin: true,
        cookieDomainRewrite: "localhost",
      },
    },
  },
});
