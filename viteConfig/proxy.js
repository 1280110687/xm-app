

export default {
  '/api': {
    changeOrigin: true,
    target: 'https://h5.btgzfwq.com/api',
    rewrite: (path) => path.replace(/^\/api/, '')
  }
}
