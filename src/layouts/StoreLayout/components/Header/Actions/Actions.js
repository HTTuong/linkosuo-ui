import classNames from 'classnames/bind';
import classes from './Actions.module.scss';
import config from '~/config';
import { Link } from 'react-router-dom';
import CartContext from '~/store/context';
import { useContext } from 'react';
import Search from './Search';
import PropTypes from 'prop-types';

const cx = classNames.bind(classes);

function Actions({ isSearching, deleteOverlay, isScrolling, setIsSearching }) {
    const ctx = useContext(CartContext);

    const openSearch = () => {
        const bodyELement = document.querySelector('body');
        bodyELement.classList.add('disable-scrollbar');
        setIsSearching(true);
    };

    return (
        <div className={cx('actions')}>
            <ul className={cx('actions-list')}>
                <li className={cx('action-item')}>
                    <Link className={cx('action-title')} to={config.routes.store.account}>
                        Account
                    </Link>
                </li>

                <li className={cx('action-item')} onClick={openSearch}>
                    Search
                    <Search isSearching={isSearching} isScrolling={isScrolling} deleteOverlay={deleteOverlay} />
                </li>

                <li className={cx('action-item')}>
                    <Link to={config.routes.store.cart}>
                        Shopping Cart
                        <span>
                            &#40;<span className={cx('item-number')}>{ctx.totalAmount}</span>&#41;
                        </span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

Actions.propTypes = {
    isSearching: PropTypes.bool.isRequired,
    deleteOverlay: PropTypes.func.isRequired,
    isScrolling: PropTypes.bool.isRequired,
    setIsSearching: PropTypes.func.isRequired,
};

export default Actions;
