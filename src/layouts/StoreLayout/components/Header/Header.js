import classNames from 'classnames/bind';
import classes from './Header.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import { useCallback } from 'react';
import Policies from './Policies';
import Actions from './Actions';
import images from '~/assets/images';

const cx = classNames.bind(classes);

function Header() {
    const [search, setSearch] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);

    const handleScroll = useCallback(() => {
        if (window.scrollY > 45) {
            setIsScrolling(true);
        } else {
            setIsScrolling(false);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    const deleteOverlay = (event) => {
        event.stopPropagation();
        const bodyELement = document.querySelector('body');
        bodyELement.classList.remove('disable-scrollbar');
        setSearch(false);
    };

    const refreshPage = () => {
        window.scrollTo(0, 0);
    };

    const disableSearchThroughPages = () => {
        const bodyELement = document.querySelector('body');
        bodyELement.classList.remove('disable-scrollbar');
        setSearch(false);
    };

    return (
        <div className={cx('wrapper')}>
            <Policies />
            <header
                className={cx('header', {
                    'has-overlay': search,
                    scrolled: isScrolling,
                })}
            >
                <Link to={config.routes.store.home}>
                    <img
                        className={cx('logo')}
                        src={images.logo}
                        alt="linkosuo"
                        onClick={() => {
                            disableSearchThroughPages();
                            refreshPage();
                        }}
                    />
                </Link>
                <Navbar disableSearch={disableSearchThroughPages} />
                <Actions
                    isSearching={search}
                    deleteOverlay={deleteOverlay}
                    isScrolling={isScrolling}
                    setIsSearching={setSearch}
                />
            </header>
            <div className={cx('search-overlay', { 'is-overlay': search })} onClick={deleteOverlay}></div>
        </div>
    );
}

export default Header;
