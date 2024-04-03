import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/static';
import tailwind from "@astrojs/tailwind";

//  
export default defineConfig({
  site: 'https://brennoalves.vercel.app',
  integrations: [tailwind(), vercel()], 
  output: 'static',
  adapter: vercel(),
});