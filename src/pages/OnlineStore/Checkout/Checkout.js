import classNames from 'classnames/bind';
import classes from './Checkout.module.scss';
import Input from '~/components/Input';
import Form from '~/components/Form';
import React from 'react';
import CartContext from '~/store/context';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import * as validator from '~/config/validate';
import config from '~/config';
import Button from '~/components/Button';
import { REACT_APP_API } from '~/constants.d';

const cx = classNames.bind(classes);
const api = REACT_APP_API;

const Checkout = () => {
    const token = localStorage.getItem('access_token');

    const [wasSubmitted, setWasSubmitted] = React.useState(false);

    const emailRef = React.useRef();
    const firstnameRef = React.useRef();
    const lastnameRef = React.useRef();

    const ctx = React.useContext(CartContext);

    const checkSubmit = React.useCallback((wasSubmitted) => {
        setWasSubmitted(wasSubmitted);
    }, []);

    const renderProducts = React.useCallback(() => {
        return ctx.order.products.map((product) => (
            <li key={Math.random()} className={cx('products-list__order-item')}>
                <div className={cx('order-item')}>
                    <img className={cx('order-item__img')} src={product.image} alt={product.id} />
                    <div className={cx('order-item__info')}>
                        <h5 className={cx('order-item__info-name')}>{product.name}</h5>
                        <p className={cx('order-item__info-price')}>{product.price}€</p>
                        <p className={cx('order-item__info-amount')}>x {product.amount}</p>
                    </div>
                    <h5 className={cx('order-item__total-amount')}>{product.total.toFixed(2)}€</h5>
                </div>
            </li>
        ));
    }, [ctx.order.products]);

    return (
        <div className={cx('wrapper')}>
            {ctx.totalAmount > 0 && (
                <div className={cx('inner')}>
                    <div className={cx('header')}>
                        <img
                            className={cx('header-logo')}
                            src="https://cdn.shopify.com/s/files/1/0544/2600/9779/files/musta_ilman_taustaa_a9c0489c-3200-4c54-972b-f5091b731c42_170x@2x.png?v=1614267179"
                            alt="Linkosuo"
                        />
                        <div className={cx('header-tape')}></div>
                        <h3 className={cx('header-title')}>Checkout</h3>
                    </div>
                    <div className={cx('container')}>
                        <div className={cx('contact-information')}>
                            <div className={cx('content')}>
                                <div className={cx('contact')}>
                                    <h4 className={cx('contact-title')}>Contact information</h4>
                                    {!token && (
                                        <div className={cx('contact-login')}>
                                            Already have a customer account ?
                                            <Link to={config.routes.account.login} className={cx('contact-login-link')}>
                                                Login here
                                            </Link>
                                        </div>
                                    )}
                                    <div className={cx('contact-form')}>
                                        <Form
                                            action="checkout"
                                            checkForSubmission={checkSubmit}
                                            titleBtn="CONFIRM PAYMENT"
                                            api={api + '/checkout'}
                                        >
                                            <Input
                                                labelTitle="Email address"
                                                name="email"
                                                type="email"
                                                placeholder="Email address"
                                                validateFunc={validator.validateEmail}
                                                wasSubmitted={wasSubmitted}
                                                ref={emailRef}
                                            />
                                            <Input
                                                labelTitle="Country"
                                                name="country"
                                                type="text"
                                                placeholder="Country"
                                                validateFunc={validator.validateString}
                                                wasSubmitted={wasSubmitted}
                                            />
                                            <div className={cx('half-inputs')}>
                                                <div className={cx('half-inputs-item')}>
                                                    <Input
                                                        labelTitle="First name"
                                                        name="firstname"
                                                        type="text"
                                                        placeholder="First name"
                                                        validateFunc={validator.validateString}
                                                        wasSubmitted={wasSubmitted}
                                                        ref={firstnameRef}
                                                    />
                                                </div>
                                                <div className={cx('half-inputs-item')}>
                                                    <Input
                                                        labelTitle="Last name"
                                                        name="lastname"
                                                        type="text"
                                                        placeholder="Last name"
                                                        validateFunc={validator.validateString}
                                                        wasSubmitted={wasSubmitted}
                                                        ref={lastnameRef}
                                                    />
                                                </div>
                                            </div>
                                            <Input
                                                labelTitle="Address"
                                                name="address"
                                                type="text"
                                                placeholder="Address"
                                                validateFunc={validator.validateString}
                                                wasSubmitted={wasSubmitted}
                                            />
                                            <div className={cx('half-inputs')}>
                                                <div className={cx('half-inputs-item')}>
                                                    <Input
                                                        labelTitle="Zip code"
                                                        name="zip_code"
                                                        type="text"
                                                        placeholder="Zip code"
                                                        validateFunc={validator.validateString}
                                                        wasSubmitted={wasSubmitted}
                                                    />
                                                </div>
                                                <div className={cx('half-inputs-item')}>
                                                    <Input
                                                        labelTitle="City"
                                                        name="city"
                                                        type="text"
                                                        placeholder="City"
                                                        validateFunc={validator.validateString}
                                                        wasSubmitted={wasSubmitted}
                                                    />
                                                </div>
                                            </div>
                                            <Input
                                                labelTitle="Phone number"
                                                name="phone"
                                                type="text"
                                                placeholder="Phone number"
                                                validateFunc={validator.validatePhoneNumber}
                                                wasSubmitted={wasSubmitted}
                                            />
                                            <div className={cx('payment')}>
                                                <div className={cx('payment-header')}>
                                                    <h4 className={cx('payment-title')}>Payment method</h4>
                                                    <p className={cx('payment-description')}>
                                                        All payments in our online store are secure and encrypted.
                                                    </p>
                                                    <div className={cx('payment-banks')}>
                                                        <img
                                                            className={cx('payment-banks-icon')}
                                                            src={images.danske}
                                                            alt="danske"
                                                        />
                                                        <img
                                                            className={cx('payment-banks-icon')}
                                                            src={images.visa}
                                                            alt="danske"
                                                        />
                                                        <img
                                                            className={cx('payment-banks-icon')}
                                                            src={images.master}
                                                            alt="danske"
                                                        />
                                                        <img
                                                            className={cx('payment-banks-icon')}
                                                            src={images.nordea}
                                                            alt="danske"
                                                        />
                                                    </div>
                                                    <Input
                                                        labelTitle="Card number"
                                                        name="card_number"
                                                        type="text"
                                                        placeholder="Card number"
                                                        validateFunc={validator.validateCardNumber}
                                                        wasSubmitted={wasSubmitted}
                                                    />
                                                    <div className={cx('half-inputs')}>
                                                        <div className={cx('half-inputs-item')}>
                                                            <Input
                                                                labelTitle="Expiration date"
                                                                name="expiration_date"
                                                                type="month"
                                                                placeholder="Expiration date"
                                                                validateFunc={validator.validateString}
                                                                wasSubmitted={wasSubmitted}
                                                            />
                                                        </div>
                                                        <div className={cx('half-inputs-item')}>
                                                            <Input
                                                                labelTitle="CVV"
                                                                name="cvv"
                                                                type="password"
                                                                placeholder="CVV"
                                                                validateFunc={validator.validateCVV}
                                                                wasSubmitted={wasSubmitted}
                                                            />
                                                        </div>
                                                    </div>
                                                    <Input
                                                        labelTitle="Card holder's name"
                                                        name="holder_name_name"
                                                        type="text"
                                                        placeholder="Card holder's name"
                                                        validateFunc={validator.validateName}
                                                        wasSubmitted={wasSubmitted}
                                                    />
                                                </div>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('products-list')}>
                            <div className={cx('products-list__header')}>
                                <h4 className={cx('products-list__header-title')}>Products</h4>
                            </div>
                            <ul className={cx('products-list__order-items')}>{renderProducts()}</ul>
                            <div className={cx('products-list__footer')}>
                                <div className={cx('total-section')}>
                                    <h5 className={cx('total-title')}>In total</h5>
                                    <h5 className={cx('total-description')}>Includes added tax</h5>
                                </div>
                                <div className={cx('total-price')}>
                                    <h5 className={cx('total-price__currency')}>EUR</h5>
                                    <p className={cx('total-price__amount')}>
                                        {ctx.order.totalAmountPrice.toFixed(2)}€
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {ctx.totalAmount === 0 && (
                <div className={cx('empty-cart')}>
                    <img className={cx('empty-cart__img')} src={images.empty_cart} alt="Empty cart" />
                    <h3 className={cx('empty-cart__title')}>Your cart is currently empty.</h3>
                    <Button className={cx('empty-cart__btn')} title="Go to shop" to={config.routes.store.home} />
                </div>
            )}
        </div>
    );
};

export default React.memo(Checkout);
