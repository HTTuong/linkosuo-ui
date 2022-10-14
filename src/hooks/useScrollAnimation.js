import React from 'react';

function useScrollAnimation(scrollCoordinateY) {
    const [animation, setAnimation] = React.useState(false);

    const checkToAnimate = React.useCallback(() => {
        if (window.scrollY >= scrollCoordinateY) {
            setAnimation(true);
        }
    }, [scrollCoordinateY]);

    React.useEffect(() => {
        window.addEventListener('scroll', checkToAnimate);

        return () => {
            window.removeEventListener('scroll', checkToAnimate);
        };
    }, [checkToAnimate]);

    return animation;
}

export default useScrollAnimation;
