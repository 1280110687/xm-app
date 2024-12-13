import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import WindiCSS from 'vite-plugin-windicss';

export default defineConfig({
  // 基本路径
  base: './',

  // 构建配置
  build: {
    outDir: 'dist', // 输出目录
    assetsDir: 'assets', // 静态资源目录
    sourcemap: false, // 是否生成 Source Map
    rollupOptions: {
      output: {
        manualChunks: {
          // 手动分包
          vendor: [ 'react', 'react-dom' ]
        }
      }
    }
  },

  // 插件配置
  plugins: [
    react(), // React SWC 插件
    WindiCSS(), // 添加 WindiCSS 插件
  ],

  // 别名设置
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 使用 @ 表示 src 目录
    }
  },

  // 开发服务器配置
  server: {
    host: '0.0.0.0', // 支持局域网访问
    port: 9527, // 自定义端口
    open: false, // 启动后自动打开浏览器
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // 代理地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // 重写路径
      }
    }
  },

  // CSS 相关配置
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
      scss: {
        additionalData: `@import "@/styles/global.scss";` // 自动引入全局样式
      }
    }
  }
});
