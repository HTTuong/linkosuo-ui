import classNames from 'classnames/bind';
import classes from './Cart.module.scss';
import CartContext from '~/store/context';
import CartEmpty from './component/CartEmpty';
import ProductItem from './component/ProductItem';
import React from 'react';
import { StoreIcon, CalendarIcon } from '~/components/Icon';
import Button from '~/components/Button';
import { useNavigate, Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(classes);

const LOCATION_PICKUP = [
    {
        shop: 'Café Linkosuo Duo',
        address: 'Pietilänkatu 2',
        postal: 'Tampere, 33720',
    },
    {
        shop: 'Café Linkosuo Elo',
        address: 'Elotie 1',
        postal: 'Ylöjärvi, 33470',
    },
    {
        shop: 'Café Linkosuo Ideapark',
        address: 'Ideaparkinkatu 4',
        postal: 'Lempäälä, 37570',
    },
    {
        shop: 'Café Linkosuo Koskikeskus',
        address: 'Hatanpään valtatie 1',
        postal: 'Tampere, 33100',
    },
    {
        shop: 'Café Linkosuo Ratina',
        address: 'Vuolteenkatu 5',
        postal: 'Tampere, 33100',
    },
    {
        shop: 'Café Siilinkari',
        address: 'Hämeenkatu 9',
        postal: 'Tampere, 33100',
    },
    {
        shop: 'Kalevanpaasi',
        address: 'Sarvijaakonkatu 5 B',
        postal: 'Tampere, 33540',
    },
    {
        shop: 'Kauppahallin Kahvila',
        address: 'Hämeenkatu 19',
        postal: 'Tampere, 33100',
    },
    {
        shop: 'Lounasravintola Hertta',
        address: 'Hermiankatu 1',
        postal: 'Tampere, 33720',
    },
    {
        shop: 'Lounasravintola Orvokki',
        address: 'Hermiankatu 6-8',
        postal: 'Tampere, 33720',
    },
    {
        shop: 'Mannakorven Kahvila',
        address: 'Mannakorventie 1',
        postal: 'Kangasala, 36240',
    },
    {
        shop: 'MIN Asemakeskus',
        address: 'Peltokatu 2',
        postal: 'Tampere, 33100',
    },
];

function Cart() {
    const ctx = React.useContext(CartContext);
    const navigate = useNavigate();

    const [haveDate, setHaveDate] = React.useState(false);

    const handleFormatTotal = React.useCallback(() => {
        if (Number.isInteger(ctx.totalAmountPrice)) {
            return ctx.totalAmountPrice;
        } else {
            return ctx.totalAmountPrice.toFixed(2);
        }
    }, [ctx.totalAmountPrice]);

    React.useLayoutEffect(() => {
        if (ctx.order.date) {
            setHaveDate(true);
        } else {
            setHaveDate(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlePayment = React.useCallback(() => {
        navigate(config.routes.store.checkout, { replace: true });
    }, [navigate]);

    const handleMofidyAddress = React.useCallback((event) => {
        ctx.handleModifyAddressOrder(event.target.value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleMofidyDate = React.useCallback((event) => {
        if (event.target.value) {
            setHaveDate(true);
            ctx.handleModifyDateOrder(event.target.value);
        } else {
            setHaveDate(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderProductsInCart = React.useCallback(() => {
        return ctx.productsInCart.map((item) => {
            return <ProductItem key={Math.random()} item={item} />;
        });
    }, [ctx.productsInCart]);

    const renderLocationPickup = React.useCallback(() => {
        return LOCATION_PICKUP.map((location) => (
            <li
                key={Math.random()}
                className={cx('cart-location__list-item', {
                    active: ctx.order.address === `${location.shop}, ${location.address}, ${location.postal}`,
                })}
            >
                <input
                    id={location.address}
                    className={cx('cart-location__list-item-input')}
                    type="radio"
                    value={`${location.shop}, ${location.address}, ${location.postal}`}
                    name="pickup_location"
                    onChange={handleMofidyAddress}
                    defaultChecked={ctx.order.address === `${location.shop}, ${location.address}, ${location.postal}`}
                />
                <label htmlFor={location.address} className={cx('cart-location__list-item-label')}>
                    <h5 className={cx('cart-location__list-item-shop')}>{location.shop}</h5>
                    <p className={cx('cart-location__list-item-address')}>{location.address}</p>
                    <p className={cx('cart-location__list-item-postal')}>{location.postal}</p>
                    <p className={cx('cart-location__list-item-opening')}>Cafe opening hours</p>
                </label>
            </li>
        ));
    }, [ctx.order.address, handleMofidyAddress]);

    return (
        <div className={cx('wrapper')}>
            {ctx.totalAmount === 0 && <CartEmpty />}
            {ctx.totalAmount !== 0 && (
                <div className={cx('cart')}>
                    <header className={cx('heading')}>Shopping basket</header>
                    <div className={cx('cart-list')}>
                        <span className={cx('product-title')}>Product</span>
                        <span className={cx('product-blank')}></span>
                        <span className={cx('product-amount')}>Amount</span>
                        <span className={cx('product-total')}>In total</span>
                    </div>
                    <div className={cx('product-list')}>{renderProductsInCart()}</div>
                    <div className={cx('cart-total')}>
                        <span className={cx('total-price')}>Total: &euro;{handleFormatTotal()}</span>
                        <span className={cx('description')}>The total price is shown at the checkout</span>
                    </div>
                    <div className={cx('cart-location')}>
                        <div className={cx('cart-location__header')}>
                            <StoreIcon />
                            <p className={cx('cart-location____header-subtitle')}>Select pickup location</p>
                        </div>
                        <div className={cx('cart-location__content')}>
                            <h5 className={cx('cart-location__content-title')}>
                                Please select a pickup location and date:
                            </h5>
                            <ul className={cx('cart-location__list')}>{renderLocationPickup()}</ul>
                        </div>
                        <div className={cx('cart-location__date')}>
                            <input
                                type="date"
                                className={cx('cart-location__date-input')}
                                value={ctx.order.date}
                                onChange={handleMofidyDate}
                            />
                            <div className={cx('cart-location__date-text', { hidden: haveDate })}>
                                Select a day and time
                            </div>
                            <div className={cx('cart-location__date-icon')}>
                                <CalendarIcon />
                            </div>
                        </div>
                    </div>
                    <Button title="Purchase" className={cx('payment-btn')} onClick={handlePayment} />
                    <h5 className={cx('payment-delivery')}>
                        By placing an order, you accept the
                        <Link to={config.routes.policies.shipping} className={cx('payment-link')}>
                            delivery and order terms.
                        </Link>
                    </h5>
                </div>
            )}
        </div>
    );
}

export default React.memo(Cart);
