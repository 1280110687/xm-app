import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/themes/index.less'
import App from './App.jsx'
import 'virtual:windi.css';
import { appBootstrap } from './init';


(async function startApp() {
  await appBootstrap(); // 先执行启动函数
  createRoot(document.getElementById('root')).render(
    <App />
  );
})();