import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import babel from "vite-plugin-babel";
import { chunkSplitPlugin } from "vite-plugin-chunk-split";

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    plugins: [
      react(),
      tsconfigPaths(),
      babel(),
      chunkSplitPlugin({
        strategy: "unbundle"
      }),
    ]
  });
};
