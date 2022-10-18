import classNames from 'classnames/bind';
import classes from './Header.module.scss';
import { Link, useLocation } from 'react-router-dom';
import config from '~/config';
import Navbar from './Navbar';
import React from 'react';
import Policies from './Policies';
import Actions from './Actions';
import { MenuIcon } from '~/components/Icon';
import Overlay from '../Overlay';
import Search from './Search';

const cx = classNames.bind(classes);

const refreshPage = () => {
    window.scrollTo(0, 0);
};

const bodyELement = document.querySelector('body');

function Header() {
    const [search, setSearch] = React.useState(false);
    const [menuSearch, setMenuSearch] = React.useState(false);
    const [isScrolling, setIsScrolling] = React.useState(false);
    const pathRoute = useLocation();

    const handleScroll = React.useCallback(() => {
        const policyElement = document.getElementById('policy');
        const policyHeight = policyElement.offsetHeight;
        if (window.scrollY > policyHeight) {
            setIsScrolling(true);
        } else {
            setIsScrolling(false);
        }
    }, []);

    React.useEffect(() => {
        bodyELement.classList.remove('disable-scrollbar');
        setSearch(false);
        setMenuSearch(false);
    }, [pathRoute.pathname]);

    React.useLayoutEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    const deleteOverlay = React.useCallback((event) => {
        event.stopPropagation();
        bodyELement.classList.remove('disable-scrollbar');
        setSearch(false);
        setMenuSearch(false);
    }, []);

    const openSideMenu = React.useCallback(() => {
        bodyELement.classList.add('disable-scrollbar');
        setMenuSearch(true);
        setSearch(false);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Policies />
            <header
                id="header"
                className={cx('header', {
                    'has-overlay': search,
                    scrolled: isScrolling,
                })}
            >
                <div className={cx('menu-icon')} onClick={openSideMenu}>
                    <MenuIcon />
                </div>
                <Link to={config.routes.store.home}>
                    <img
                        className={cx('logo')}
                        src="https://cdn.shopify.com/s/files/1/0544/2600/9779/files/musta_ilman_taustaa_a9c0489c-3200-4c54-972b-f5091b731c42_170x@2x.png?v=1614267179"
                        alt="linkosuo"
                        onClick={refreshPage}
                    />
                </Link>
                <Navbar deleteOverlay={deleteOverlay} menuSearch={menuSearch} />
                <Actions setIsSearching={setSearch} />
                <Search isSearching={search} isScrolling={isScrolling} deleteOverlay={deleteOverlay} />
                <div className={cx('header-overlay', { show: menuSearch })} onClick={deleteOverlay}></div>
            </header>

            {isScrolling && <div className={cx('header-shadow')}></div>}
            <Overlay active={search || menuSearch} zIndex="3" inactiveFunction={deleteOverlay} />
        </div>
    );
}

export default Header;
