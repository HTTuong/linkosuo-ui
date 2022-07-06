import classNames from 'classnames/bind';
import classes from './Navbar.module.scss';
import NavbarItem from './NavbarItem';
import PropTypes from 'prop-types';
import { NAVBAR_ITEMS } from '~/config/navbar';

const cx = classNames.bind(classes);

function Navbar({ disableSearch }) {
    const renderNavbarItem = () => {
        return NAVBAR_ITEMS.map((item, index) => {
            const isParent = !!item.children;

            if (isParent) {
                return (
                    <NavbarItem
                        key={index}
                        to={item.to}
                        title={item.title}
                        subNavbar={item.children}
                        disableSearch={disableSearch}
                    />
                );
            } else {
                return <NavbarItem key={index} title={item.title} to={item.to} disableSearch={disableSearch} />;
            }
        });
    };

    return (
        <div className={cx('navbar')}>
            <ul className={cx('navbar-list')}>{renderNavbarItem()}</ul>
        </div>
    );
}

Navbar.propTypes = {
    disableSearch: PropTypes.func.isRequired,
};

export default Navbar;
