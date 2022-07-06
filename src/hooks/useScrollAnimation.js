import { useState, useEffect, useCallback } from 'react';

function useScrollAnimation(scrollCoordinateY) {
    const [animation, setAnimation] = useState(false);

    const checkToAnimate = useCallback(() => {
        if (window.scrollY >= scrollCoordinateY) {
            setAnimation(true);
        }
    }, [scrollCoordinateY]);

    useEffect(() => {
        window.addEventListener('scroll', checkToAnimate);

        return () => {
            window.removeEventListener('scroll', checkToAnimate);
        };
    }, [checkToAnimate]);

    return animation;
}

export default useScrollAnimation;
