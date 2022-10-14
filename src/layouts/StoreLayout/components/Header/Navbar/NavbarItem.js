import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import React from 'react';
import Dropdown from './Dropdown';
import classes from './Navbar.module.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(classes);
const bodyELement = document.querySelector('body');

function NavbarItem({ title, to, subNavbar }) {
    const [showSubnav, setShowSubnav] = React.useState(false);

    const handleToNavigate = React.useCallback(() => {
        if (subNavbar && bodyELement.clientWidth <= 1180) {
            return '';
        } else {
            return to;
        }
    }, [subNavbar, to]);

    let Comp = Link;
    let propsComp = {
        to: handleToNavigate(),
    };

    if (subNavbar && bodyELement.clientWidth <= 1180) {
        Comp = 'div';
        propsComp = {
            className: cx('navbar-item-title'),
            onClick: () => {
                setShowSubnav((prev) => !prev);
            },
        };
    }

    return (
        <li className={cx('navbar-item', { 'has-subnav': subNavbar })}>
            <Comp {...propsComp}>{title}</Comp>
            {subNavbar && (
                <div className={cx('menu-subnav-icon', { rotate: showSubnav })}>
                    {!showSubnav && <FontAwesomeIcon icon={faPlus} />}
                    {showSubnav && <FontAwesomeIcon icon={faMinus} />}
                </div>
            )}
            {subNavbar && <Dropdown subNavbar={subNavbar} showSubnav={showSubnav} />}
        </li>
    );
}

NavbarItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    subNavbar: PropTypes.array,
};

export default NavbarItem;
