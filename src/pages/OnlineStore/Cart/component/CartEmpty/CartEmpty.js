import classNames from 'classnames/bind';
import Button from '~/components/Button';
import config from '~/config';
import classes from './CartEmpty.module.scss';

const cx = classNames.bind(classes);

function CartEmpty() {
    return (
        <div className={cx('cart-empty')}>
            <span className={cx('cart-empty__title')}>Your shopping cart is empty</span>
            <Button className={cx('cart-empty__btn')} title="For shoppping" to={config.routes.collections.allproduct} />
        </div>
    );
}

export default CartEmpty;
