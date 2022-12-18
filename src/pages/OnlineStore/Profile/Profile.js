import classNames from 'classnames/bind';
import classes from './Profile.module.scss';
import Button from '~/components/Button';
import Loading from '~/components/Loading';
import { useDispatch } from 'react-redux';
import { authActions } from '~/store/redux/auth';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import config from '~/config';
import axios from 'axios';
import { REACT_APP_API } from '~/constants.d';

const cx = classNames.bind(classes);
const api = REACT_APP_API;

const changeDateFormat = (dateInput) => {
    const eventDate = new Date(dateInput);
    const day = ('0' + eventDate.getDate()).slice(-2);
    const month = ('0' + (eventDate.getMonth() + 1)).slice(-2);
    const year = eventDate.getFullYear();

    const date = [day, month, year].join('/');

    const hour = ('0' + eventDate.getHours()).slice(-2);
    const minute = ('0' + eventDate.getMinutes()).slice(-2);
    const second = ('0' + eventDate.getSeconds()).slice(-2);

    const time = [hour, minute, second].join(':');

    return `${time} - ${date}`;
};

const changeOrderOfDate = (dateInput) => {
    const date = dateInput.split('-').reverse().join('-');
    return date;
};

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');
    const [isLoading, setIsLoading] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState({});

    React.useLayoutEffect(() => {
        setIsLoading(true);
        axios
            .get(api + '/checkout/order', {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            .then((response) => {
                setUserInfo({
                    username: response.data.username,
                    orders: response.data.orders,
                });
                setIsLoading(false);
            })
            .catch((error) => console.log(error));
    }, [token]);

    const handleLogout = React.useCallback(() => {
        dispatch(authActions.removeLoginInfo());
        localStorage.removeItem('access_token');
        navigate(config.routes.store.home);
        window.location.reload();
    }, [dispatch, navigate]);

    const renderOrders = React.useCallback(() => {
        return userInfo.orders.reverse().map((order) => (
            <li key={order.orderId} className={cx('orders__item')}>
                <div className={cx('orders__info-section')}>
                    <div className={cx('orders__item-heading')}>
                        <div className={cx('orders__item-title')}>Order</div>
                        <h5 className={cx('orders__item-id')}>#{order.orderId}</h5>
                        <h5 className={cx('orders__item-time')}>At {changeDateFormat(order.orderAt)}</h5>
                    </div>
                    <ul className={cx('orders__products')}>
                        {!!userInfo.orders &&
                            order.products.map((product) => (
                                <li key={product.productId} className={cx('orders__products-item')}>
                                    <img
                                        className={cx('orders__products-img')}
                                        src={product.image}
                                        alt={product.name}
                                    />
                                    <div className={cx('orders__products-info')}>
                                        <h5 className={cx('orders__products-name')}>{product.name}</h5>
                                        <p className={cx('orders__products-price')}>{product.price}€</p>
                                        <p className={cx('orders__products-quantity')}> x {product.amount}</p>
                                    </div>
                                    <div className={cx('orders__products-total')}>
                                        <p className={cx('orders__products-total-price')}>
                                            {(product.price * product.amount).toFixed(2)}€
                                        </p>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
                <div className={cx('orders__total-section')}>
                    <div className={cx('orders__pickup')}>
                        <div className={cx('orders__pickup-info')}>
                            <h5 className={cx('orders__pickup-info-title')}>Pickup date:</h5>
                            <p className={cx('orders__pickup-info-value')}>
                                {changeOrderOfDate(order.pickup_info.pickup_date)}
                            </p>
                        </div>
                        <div className={cx('orders__pickup-info')}>
                            <h5 className={cx('orders__pickup-info-title')}>Location:</h5>
                            <p className={cx('orders__pickup-info-value')}>{order.pickup_info.pickup_address}</p>
                        </div>
                    </div>
                    <div className={cx('orders__total-wrapper')}>
                        <div className={cx('orders__total')}>
                            <h5 className={cx('orders__total-title')}>Total:</h5>
                            <p className={cx('orders__total-price')}>€{order.total_price.toFixed(2)}</p>
                        </div>
                        <p className={cx('orders__total-subtitle')}>The total price is shown at the checkout</p>
                    </div>
                </div>
            </li>
        ));
    }, [userInfo.orders]);

    return (
        <div className={cx('wrapper', { loading: isLoading })}>
            <div className={cx('inner', { load: isLoading })}>
                {!isLoading && (
                    <>
                        <Button
                            title="Log out"
                            onClick={handleLogout}
                            to={config.routes.store.home}
                            className={cx('logout-btn')}
                        />
                        <div className={cx('heading')}>
                            <h2 className={cx('heading__title')}>My account</h2>
                            <h3 className={cx('heading__name')}>Hei {userInfo && userInfo.username} !</h3>
                        </div>
                        <div className={cx('content')}>
                            <div className={cx('orders')}>
                                <div className={cx('order__heading')}>
                                    <h5 className={cx('order__title')}>My orders</h5>
                                </div>
                                <div className={cx('orders')}>
                                    {!!userInfo.orders && userInfo.orders.length === 0 && (
                                        <h5 className={cx('order__empty-title')}>
                                            You have not placed any orders yet.
                                        </h5>
                                    )}
                                    {!isLoading && (
                                        <ul className={cx('orders__list')}>{!!userInfo.orders && renderOrders()}</ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {isLoading && (
                    <div className={cx('loading-section')}>
                        <Loading />
                    </div>
                )}
            </div>
        </div>
    );
};

export default React.memo(Profile);
