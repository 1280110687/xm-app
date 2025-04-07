import React, { useEffect, lazy } from 'react';
import { useLocation } from 'react-router-dom';
import { GetQueryString } from '@/utils';

const needLoginPathnames = ['']; // 需要登录的路由

export default () => {
  const location = useLocation();
  console.warn(location, GetQueryString("pages"), "location");
  // const userInfo = useAtomValue(userInfoAtom);

  // const [loginPopType, setLoginPopType] = useAtom(loginPopTypeAtom);

  useEffect(() => {
    if (needLoginPathnames.find((pathname) => location.pathname.endsWith(pathname))) {
      console.log(`${location.pathname} 需要拦截`, userInfo);
    } else {
      //etLoginPopType("");
    }
  }, [location]);
};
