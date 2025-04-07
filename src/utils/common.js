import { Toast } from 'antd-mobile';

export const isNumber = (value) => !isNaN(value) && Number.isFinite(Number(value));

export const getFullSize = (size) => (isNumber(size) ? `${size}px` : size);

export function GetQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = window.location.search.slice(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return '';
}
