// src/router.js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Layout from '@/layout';
import Home from '@/pages/Home';

// const Home = lazy(() => import('@/pages/Home'));

const NotFound = () => <div>NotFound 404</div>;

{
    /* <Suspense fallback={<div>Loading...</div>}>

</Suspense> */
}

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
            </Route>
            {/* 未匹配路由的重定向 */}
            <Route path="/*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRouter;
