import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import babel from "vite-plugin-babel";
import fs from "fs";

interface Route{
  url: string
  filePath: string
}

function GenerateRoutes(pagesFolder: string){
  const folderContent = fs.readdirSync(pagesFolder);
  const routes: Route[] = [];
  for(const file of folderContent){
    const filePath = `${pagesFolder}/${file}`;

    if(fs.lstatSync(filePath).isDirectory()){
      let temp = GenerateRoutes(filePath);
      temp = temp.map((v) => {
        if(v.url){
          v.url = `/${v.url}`;
        }
        return {
          url: `${file}${v.url}`,
          filePath: v.filePath
        };
      });
      routes.push(...temp);
      continue;
    }else if(!file.endsWith("tsx") || file.endsWith(".d.tsx")){
      continue;
    }

    let url: string | string[] = file.split(".");
    url.pop();
    url = url.join(".");

    if(url === "index"){
      url = "";
    }

    routes.push({
      filePath: filePath.replace("./src", "@"),
      url,
    });
  }

  return routes;
}

// https://vitejs.dev/config/
export default () => {
  const routes: Route[] = GenerateRoutes("./src/pages");

  return defineConfig({
    plugins: [
      react(),
      tsconfigPaths(),
      babel(),
      splitVendorChunkPlugin()
    ],
    define: {routes}
  });
};
