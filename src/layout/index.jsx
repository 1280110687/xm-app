import React, { Suspense, useLayoutEffect } from 'react';
import { useCreateFavicon } from '@/utils/createFavicon';
import { Outlet } from 'react-router-dom';


export default () => {
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
        {/* <FooterTab /> */}
      </footer>


    </div>
  )
};
