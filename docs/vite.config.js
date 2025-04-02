import { defineConfig } from 'vite';
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  plugins: [
    Components({
      dirs: ['.vitepress/theme/components'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [ArcoResolver({
        sideEffect: true,   // 启用副作用自动导入
        resolveIcons: true  // 启用图标组件自动解析
      })]
    }),
  ],
  ssr: {
    noExternal: ['@arco-design/web-vue'] // SSR 不外部化处理
  },
  resolve: {
    alias: {
      'mermaid': 'mermaid/dist/mermaid.esm.mjs', // 解决 Mermaid ESM 兼容性问题
    },
  },
});
