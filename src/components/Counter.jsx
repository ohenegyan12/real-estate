import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Counter = ({ from, to, duration = 2 }) => {
    const [count, setCount] = useState(from);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            let startTime;
            let animationFrame;

            const animate = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

                // Easing function for smoother animation (easeOutExpo)
                const easeOut = 1 - Math.pow(2, -10 * progress);

                setCount(Math.floor(easeOut * (to - from) + from));

                if (progress < 1) {
                    animationFrame = requestAnimationFrame(animate);
                }
            };

            animationFrame = requestAnimationFrame(animate);
            return () => cancelAnimationFrame(animationFrame);
        }
    }, [isInView, from, to, duration]);

    return <span ref={ref}>{count}</span>;
};

export default Counter;
