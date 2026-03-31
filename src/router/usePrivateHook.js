import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GetQueryString } from '@/utils';

const needLoginPathnames = ['']; // 需要登录的路由

export default () => {
  const location = useLocation();
  console.warn(location, GetQueryString("pages"), "location");

  useEffect(() => {
    if (needLoginPathnames.find((pathname) => location.pathname.endsWith(pathname))) {
      console.log(`${location.pathname} 需要拦截`);
    }
  }, [location]);
};
