import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import babel from "vite-plugin-babel";

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    plugins: [
      react(),
      tsconfigPaths(),
      babel(),
      splitVendorChunkPlugin()
    ]
  });
};
