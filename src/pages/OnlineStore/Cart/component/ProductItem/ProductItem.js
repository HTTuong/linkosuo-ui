import classNames from 'classnames/bind';
import classes from './ProductItem.module.scss';
import React from 'react';
import CartContext from '~/store/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(classes);

function ProductItem({ item }) {
    const ctx = React.useContext(CartContext);

    const addProduct = () => {
        const newProduct = {
            _id: item._id,
            name: item.name,
            price: item.price,
            total: +item.price,
            image: item.image,
            amount: 1,
        };
        ctx.handleAddProduct(newProduct);
    };

    const removeProduct = () => {
        const newProduct = {
            _id: item._id,
            name: item.name,
            price: item.price,
            total: +item.price,
            image: item.image,
            amount: 1,
        };
        ctx.handleRemoveProduct(newProduct);
    };

    const deleteProduct = () => {
        const newProduct = {
            _id: item._id,
            name: item.name,
            price: item.price,
            total: +item.total,
            image: item.image,
            amount: item.amount,
        };
        ctx.handleDeleteProduct(newProduct);
    };

    const handleCheckNumber = React.useCallback(() => {
        if (Number.isInteger(item.total)) {
            return item.total;
        } else {
            return item.total.toFixed(2);
        }
    }, [item.total]);

    return (
        <div className={cx('product-item')}>
            <img src={item.image} alt={item.name} className={cx('product-image')} />

            <div className={cx('product-info')}>
                <h3 className={cx('product-name')}>{item.name}</h3>
                <span className={cx('product-price')}>{item.price}&euro;</span>
            </div>
            <div className={cx('product-amount-section')}>
                <div className={cx('product-amount-input')}>
                    <div className={cx('product-modify')} onClick={removeProduct}>
                        <FontAwesomeIcon icon={faMinus} className={cx('product-modifier')} />
                    </div>
                    <div className={cx('product-amount-value')}>{item.amount}</div>
                    <div className={cx('product-modify')} onClick={addProduct}>
                        <FontAwesomeIcon icon={faPlus} className={cx('product-modifier')} />
                    </div>
                </div>
                <span className={cx('product-delete')} onClick={deleteProduct}>
                    Delete
                </span>
            </div>

            <div className={cx('product-total-section')}>
                <span className={cx('product-total-price')}>{handleCheckNumber()}&euro;</span>
            </div>
        </div>
    );
}

export default React.memo(ProductItem);
