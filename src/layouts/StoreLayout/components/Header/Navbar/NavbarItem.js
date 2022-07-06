import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import classes from './Navbar.module.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(classes);

function NavbarItem({ title, to, subNavbar, disableSearch }) {
    return (
        <li className={cx('navbar-item', { 'has-subnav': subNavbar })} onClick={disableSearch}>
            <Link to={to}>{title}</Link>
            {subNavbar && <Dropdown subNavbar={subNavbar} />}
        </li>
    );
}

NavbarItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    subNavbar: PropTypes.array,
    disableSearch: PropTypes.func.isRequired,
};

export default NavbarItem;
