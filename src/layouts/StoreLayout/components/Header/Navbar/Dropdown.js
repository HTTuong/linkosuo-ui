import classNames from 'classnames/bind';
import classes from './Navbar.module.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const cx = classNames.bind(classes);

function Dropdown({ subNavbar }) {
    const renderItems = () => {
        return subNavbar.map((item, index) => {
            return (
                <Link key={index} to={item.to} className={cx('subnav-item')}>
                    {item.title}
                </Link>
            );
        });
    };

    return <ul className={cx('sub-navbar')}>{renderItems()}</ul>;
}

Dropdown.propTypes = {
    subNavbar: PropTypes.array.isRequired,
};

export default Dropdown;
