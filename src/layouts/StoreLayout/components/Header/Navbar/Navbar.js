import React from 'react';
import classNames from 'classnames/bind';
import classes from './Navbar.module.scss';
import NavbarItem from './NavbarItem';
import PropTypes from 'prop-types';
import config from '~/config';
import { Link } from 'react-router-dom';
import { NAVBAR_ITEMS } from '~/config/navbar';
import { CloseIcon } from '~/components/Icon';

const cx = classNames.bind(classes);

function Navbar({ deleteOverlay, menuSearch }) {
    const token = localStorage.getItem('access_token');
    const renderNavbarItem = React.useCallback(() => {
        return NAVBAR_ITEMS.map((item) => {
            const isParent = !!item.children;

            if (isParent) {
                return <NavbarItem key={Math.random()} to={item.to} title={item.title} subNavbar={item.children} />;
            } else {
                return <NavbarItem key={Math.random()} title={item.title} to={item.to} />;
            }
        });
    }, []);

    const changeLink = React.useCallback(() => {
        if (token) {
            return config.routes.account.profile;
        }
        return config.routes.account.login;
    }, [token]);

    return (
        <div className={cx('navbar', { show: menuSearch })}>
            <div className={cx('close-icon-wrapper')} onClick={deleteOverlay}>
                <CloseIcon className={cx('close-icon')} width="1.5rem" />
            </div>
            <ul className={cx('navbar-list', { 'show-navbar-list': menuSearch })}>{renderNavbarItem()}</ul>
            <div className={cx('account-section', { 'show-account': menuSearch })}>
                <Link className={cx('account-link')} to={changeLink()}>
                    Account
                </Link>
            </div>
        </div>
    );
}

Navbar.propTypes = {
    deleteOverlay: PropTypes.func,
    menuSearch: PropTypes.bool,
};

export default React.memo(Navbar);
