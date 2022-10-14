import React from 'react';
import classNames from 'classnames/bind';
import classes from './LastView.module.scss';
import GridProducts from '~/components/GridProducts';
import CartContext from '~/store/context';

const cx = classNames.bind(classes);

const LastView = () => {
    const ctx = React.useContext(CartContext);

    const handleLastViewFilter = React.useCallback(() => {
        const reverseProduct = ctx.lastViewedProducts.reverse();
        let slicedProduct = reverseProduct.slice(1, 9);
        return slicedProduct;
    }, [ctx.lastViewedProducts]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('heading')}>
                    <h3 className={cx('heading__title')}>Last viewed products</h3>
                </div>
                <ul className={cx('products-list')}>
                    <GridProducts products={handleLastViewFilter()} lastviewwidth />
                </ul>
            </div>
        </div>
    );
};

export default LastView;
