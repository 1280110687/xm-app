import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  darkMode: 'class', // 或 'media'
  theme: {
    extend: {
      colors: {
        primary: '#1e90ff',
      },
    },
  },
  plugins: [],
});
