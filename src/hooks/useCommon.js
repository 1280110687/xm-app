import { useState, useEffect, useRef } from 'react';

export default function useCountdown(initialSeconds, onComplete) {
    const [seconds, setSeconds] = useState(initialSeconds);
    const timerRef = useRef(null);

    useEffect(() => {
        if (initialSeconds <= 0) {
            onComplete && onComplete();
            return;
        }
        setSeconds(initialSeconds);

        timerRef.current = setInterval(() => {
            setSeconds(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    onComplete && onComplete();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // 清理定时器
        return () => clearInterval(timerRef.current);
    }, [initialSeconds, onComplete]);

    return seconds;
}

