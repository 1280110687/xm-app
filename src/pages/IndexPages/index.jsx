/**
* IndexPages-page
*/
import React, { useEffect, lazy, useMemo } from 'react';
import './index.less';
import Home from '@/pages/Home';
import Letter from '@/pages/letter';
import Bingo from '@/pages/Bingo';

import { GetQueryString } from '@/utils';





const IndexPages = () => {

    const path = useMemo(() => {
        return GetQueryString('pages')
    }, [])

    const pathMap = {
        "home": <Home />,
        "letter": <Letter />,
        "bingo": <Bingo />,
    }


    return <div className={`IndexPages-page`}>
        {pathMap[path] ? pathMap[path] : pathMap["home"]}
    </div>;
};
export default IndexPages;