

function removeGlobalLoading() {
    const loadingEl = document.getElementById('global-loading');
    const root = document.getElementById('root');

    if (loadingEl?.parentNode) {
        loadingEl.parentNode.removeChild(loadingEl);
        if (root) root.style.minHeight = '100vh';
    }
}

export async function appBootstrap() {
    console.log('🚀 启动初始化中...');

    // try {
    //     const data = await fetchAppCheck();
    //     console.warn(`%c 🚨 data => ${JSON.stringify(data)}`, 'color: #0384fc; font-weight: bold;');
    //     // 可以根据 data 做初始化逻辑
    //     // 例如保存全局配置、Token 校验、权限判断等
    // } catch (err) {
    //     console.error('❌ 启动时检查接口失败:', err);
    //     // ✅ 降级处理：比如记录错误，设置默认值，继续初始化
    //     // 也可以设置全局状态如 error 状态，以显示错误页面或 Toast
    // }

    // 即使失败，也要继续初始化逻辑，避免白屏
    await new Promise(resolve => setTimeout(resolve, 2000)); // 模拟延时s
    removeGlobalLoading();
    console.log('✅ 初始化完成');

}
