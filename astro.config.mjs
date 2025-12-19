import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), tailwind()],
  site: 'https://xinyi-jane.github.io',
  // 开发环境不使用 base 路径，生产环境使用 /blog/
  base: import.meta.env.DEV ? '/' : '/blog/',
  output: 'static',
});

