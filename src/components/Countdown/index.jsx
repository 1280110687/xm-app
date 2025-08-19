import React, { useState, useEffect } from 'react';

export default function Countdown({ className, seconds, onFinish }) {
    const [timeLeft, setTimeLeft] = useState(seconds);

    useEffect(() => {
        setTimeLeft(seconds); // 每次 seconds 改变时重置倒计时
    }, [seconds]);

    useEffect(() => {
        if (timeLeft <= 0) {
            onFinish?.();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, onFinish]);

    return <span className={`text-red-700 ${className}`}>{timeLeft}</span>;
}
