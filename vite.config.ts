import { defineConfig } from "vite";
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
    ],
    build:{
      rollupOptions:{
        output:{
          manualChunks(id){
            if(id.includes("@nozbe/watermelondb")){
              return "watermelondb";
            }
            if(id.includes("@fortawesome")){
              return "fortawesome";
            }
            if(id.includes("react-router-dom")){
              return "react-router-dom";
            }
          }
        }
      }
    }
  });
};
