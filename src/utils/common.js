import { Toast } from 'antd-mobile';
import copy from 'copy-to-clipboard';

// 判断数字类型
export const isNumber = (value) =>
    !isNaN(value) && Number.isFinite(Number(value));
// 对数字类型添加px
export const getFullSize = (size) => (isNumber(size) ? `${size}px` : size);

export const useHelper = () => {
    const copyText = async (text, sucString) => {
        await copy(text);

        Toast.show(sucString);
    };
    const linkTo = (url = localStorage.cusurl) => {
        const { uid = '', username = '' } = useLoginHook().info();
        if (window?._MEIQIA) {
            setTimeout(() => window.open(url + `?metadata={comment:${uid}}`));
        } else {
            setTimeout(() =>
                window.open(
                    url?.match(/\router|mid/g)
                        ? url + uid + '/' + username
                        : url,
                    '',
                ),
            );
        }
    };
    const getMobileModel = () => {
        const userAgent = navigator.userAgent;
        const startIndex = userAgent.indexOf('(') + 1;
        const endIndex = userAgent.indexOf(';');
        const mobileModel = userAgent.substring(startIndex, endIndex);
        return mobileModel;
    };
    const switchIoLeaveID = (ids = 1) => {
        const loc = localStorage;
        loc.marketChannleID = ids;
        loc.contractChannleID = ids;
        loc.klineChannleID = ids;
        return {
            loc,
        };
    };
    const sleep = (time) => new Promise(resolve => setTimeout(resolve, time))
    return {
        copyText,
        linkTo,
        getMobileModel,
        switchIoLeaveID,
        sleep
    };
};
