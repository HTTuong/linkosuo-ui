import React from 'react';
import classNames from 'classnames/bind';
import classes from './Navbar.module.scss';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

const cx = classNames.bind(classes);

function Dropdown({ subNavbar, showSubnav }) {
    const renderItems = () => {
        return subNavbar.map((item) => {
            return (
                <li key={Math.random()}>
                    <Link to={item.to} className={cx('subnav-item')}>
                        {item.title}
                    </Link>
                </li>
            );
        });
    };

    return <ul className={cx('sub-navbar', { 'show-subnav': showSubnav })}>{renderItems()}</ul>;
}

Dropdown.propTypes = {
    subNavbar: PropTypes.array.isRequired,
};

export default Dropdown;
