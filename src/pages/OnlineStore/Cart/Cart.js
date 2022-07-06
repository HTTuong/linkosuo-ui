import classNames from 'classnames/bind';
import classes from './Cart.module.scss';
import CartContext from '~/store/context';
import CartEmpty from './component/CartEmpty';
import ProductItem from './component/ProductItem';
import { useContext } from 'react';
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(classes);

function Cart() {
    const ctx = useContext(CartContext);
    const navigate = useNavigate();

    const handleFormatTotal = () => {
        if (Number.isInteger(ctx.totalAmountPricel)) {
            return ctx.totalAmountPrice;
        } else {
            return ctx.totalAmountPrice.toFixed(2);
        }
    };

    const handlePayment = () => {
        ctx.handleClearProduct();
        navigate(config.routes.store.payment, { replace: true });
    };

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
                    <div className={cx('product-list')}>
                        {ctx.productsInCart.map((item, index) => (
                            <ProductItem key={index} item={item} />
                        ))}
                    </div>
                    <div className={cx('cart-total')}>
                        <span className={cx('total-price')}>Total: &euro;{handleFormatTotal()}</span>
                        <span className={cx('description')}>The total price is shown at the checkout</span>
                    </div>
                    <Button title="Purchase" className={cx('payment-btn')} onClick={handlePayment} />
                </div>
            )}
        </div>
    );
}

export default Cart;
