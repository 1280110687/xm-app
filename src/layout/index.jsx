import React, { Suspense, useLayoutEffect } from 'react';
import { useCreateFavicon } from '@/utils/createFavicon';
import { Outlet } from 'react-router-dom';


export default function Layout() {
  const { doCreate } = useCreateFavicon();

  useLayoutEffect(() => {
    doCreate();
    document.title = "XM"
  }, [])

  return (
    <div>
      <header>
        {/* <Nav /> */}
      </header>

      <Suspense fallback={<div className='text-center py-30px text-18px'>Loading...</div>}>
        <main>
          <Outlet />
        </main>
      </Suspense>

      <footer>
        {/* <div>XM-App ©2025 Created by XM</div> */}
      </footer>

    </div>
  )
};
