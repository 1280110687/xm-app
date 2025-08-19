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


export const asyncTime = function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * 当一个操作频繁触发时，只有在停止触发后的指定时间才会执行操作。
 * @param {function} func
 * @param {number} wait 指定时间
 * @param {object} options { trailing: false } 是否结束后执行   { leading: true } 立即执行
 * @returns
 */
export function debounce(func, wait, options = {}) {
    let timerId, lastArgs, lastThis;
    let leading = options.leading || false;  // 是否立即执行
    let trailing = 'trailing' in options ? options.trailing : true; // 是否结束后执行

    function invokeFunc() {
        func.apply(lastThis, lastArgs);
        lastArgs = lastThis = null;
    }

    function debounced(...args) {
        lastArgs = args;
        lastThis = this;

        // 立即执行（leading）
        let shouldCallNow = leading && !timerId;
        if (shouldCallNow) {
            invokeFunc();
        }

        // 清除已有的定时器
        clearTimeout(timerId);

        // 设置新的定时器
        timerId = setTimeout(() => {
            timerId = null;
            if (trailing && !shouldCallNow) {
                invokeFunc();
            }
        }, wait);
    }

    debounced.cancel = function () {
        clearTimeout(timerId);
        timerId = lastArgs = lastThis = null;
    };

    return debounced;
}

/**
 * 当一个操作频繁触发时，只有在指定时间才会执行操作。
 * @param {function} func
 * @param {number} wait 指定时间
 * @param {object} options { trailing: false } 是否结束后执行   { leading: true } 立即执行
 * @returns
 */
export function throttle(func, wait, options = {}) {
    let timerId = null;
    let lastArgs, lastThis;
    let lastCallTime = 0;

    const leading = options.leading ?? true;
    const trailing = options.trailing ?? true;

    function invokeFunc(time) {
        lastCallTime = time;
        func.apply(lastThis, lastArgs);
        lastArgs = lastThis = null;
    }

    function startTimer(callback, delay) {
        timerId = setTimeout(() => {
            timerId = null;
            callback();
        }, delay);
    }

    function trailingEdge(time) {
        if (trailing && lastArgs) {
            invokeFunc(time);
        }
        timerId = null;
    }

    function throttled(...args) {
        const now = Date.now();
        const remaining = wait - (now - lastCallTime);

        lastArgs = args;
        lastThis = this;

        const shouldInvoke = lastCallTime === 0 && !leading;

        if (shouldInvoke) {
            lastCallTime = now;
        }

        if (remaining <= 0 || remaining > wait) {
            if (timerId) {
                clearTimeout(timerId);
                timerId = null;
            }
            invokeFunc(now);
        } else if (!timerId && trailing) {
            startTimer(() => trailingEdge(Date.now()), remaining);
        }
    }

    throttled.cancel = function () {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = lastArgs = lastThis = null;
        lastCallTime = 0;
    };

    return throttled;
}