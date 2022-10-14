import React from 'react';
import { useLocation } from 'react-router-dom';

function GoToTop() {
    const routePath = useLocation();

    const onTop = React.useCallback(() => {
        window.scrollTo(0, 0);
    }, []);

    React.useEffect(() => {
        onTop();
    }, [routePath, onTop]);

    return null;
}

export default React.memo(GoToTop);
