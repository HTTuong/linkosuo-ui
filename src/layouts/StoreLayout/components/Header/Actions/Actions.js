import classNames from 'classnames/bind';
import classes from './Actions.module.scss';
import config from '~/config';
import { Link } from 'react-router-dom';
import CartContext from '~/store/context';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, CartIcon } from '~/components/Icon';
import PropTypes from 'prop-types';

const cx = classNames.bind(classes);

function Actions({ setIsSearching }) {
    const ctx = React.useContext(CartContext);
    const token = localStorage.getItem('access_token');
    const navigate = useNavigate();

    const openSearch = React.useCallback(() => {
        const bodyELement = document.querySelector('body');
        bodyELement.classList.add('disable-scrollbar');
        setIsSearching(true);
    }, [setIsSearching]);

    const changeLink = React.useCallback(() => {
        if (token) {
            return config.routes.account.profile;
        }
        return config.routes.account.login;
    }, [token]);

    const navigateToCart = React.useCallback(() => {
        navigate(config.routes.store.cart, { replace: true });
    }, [navigate]);

    return (
        <div className={cx('actions')}>
            <ul className={cx('actions-list')}>
                <li className={cx('action-item')}>
                    <Link className={cx('action-title')} to={changeLink()}>
                        Account
                    </Link>
                </li>
                <li className={cx('action-item')} onClick={openSearch}>
                    Search
                </li>
                <li className={cx('action-item__icon')} onClick={openSearch}>
                    <SearchIcon width="2.1rem" height="2.1rem" />
                </li>

                <li className={cx('action-item')}>
                    <div onClick={navigateToCart}>
                        Shopping Cart
                        <span className={cx('action-item__amount-item')}>
                            &#40;<span className={cx('item-number')}>{ctx.totalAmount}</span>&#41;
                        </span>
                    </div>
                </li>
                <li className={cx('action-item__icon')} onClick={navigateToCart}>
                    <CartIcon width="2.3rem" height="2.3rem" />
                    {ctx.productsInCart.length > 0 && <span className={cx('action-item__icon-dot')}></span>}
                </li>
            </ul>
        </div>
    );
}

Actions.propTypes = {
    setIsSearching: PropTypes.func.isRequired,
};

export default React.memo(Actions);
