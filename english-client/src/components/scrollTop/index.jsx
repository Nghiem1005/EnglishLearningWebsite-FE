import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollTop({ children }) {
    const location = useLocation();
    useLayoutEffect(() => {
        document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'smooth'});
    }, [location.pathname]);
    return children;
}

export default ScrollTop;
