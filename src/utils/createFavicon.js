/**
* @module createFavicon
* @author:  XM
* @description: 生成Favicon
* @since: 创建时间  2024-12-10 16:08:06
* @FilePath: D:\Work\exchangev5-h5\src\utils\createFavicon.js
*/

import ico from '@/assets/favicon.ico';

export const useCreateFavicon = () => {
    const createFavicon = ({ url, rel, id }) => {
        const link = document.createElement('link');
        link.rel = rel || 'apple-touch-icon';;
        link.type = "image/x-icon";
        link.id = id;
        // link.href = url //SUrl() + initialState?.merchantConfig?.Favicon;
        link.href = `${url}?timestamp=${Date.now()}`;
        const head = document.getElementsByTagName('head')[ 0 ];
        const favicon = document.getElementById(id);
        !favicon && head.appendChild(link);
    }
    const addMeta = (name, content) => {
        const meta = document.createElement('meta');
        meta.name = name;
        meta.content = content;
        document.getElementsByTagName('head')[ 0 ].appendChild(meta);
        return this
    };
    const doCreate = () => {
        // 后期改为后台可配置
        const url = ico;
        createFavicon({ url, rel: 'shortcut icon', id: 'Favicon' });
        createFavicon({ url, rel: 'apple-touch-icon', id: 'FaviconIos' });
        [
            { 'google': 'notranslate' },
            { 'apple-mobile-web-app-capable': 'yes' },
            { 'mobile-web-app-capable': 'yes' }
        ]
            .reverse()
            .forEach((res) => addMeta(Object.keys(res)[ 0 ], Object.values(res)[ 0 ]));
    }

    return {
        createFavicon,
        addMeta,
        doCreate,
    }
}