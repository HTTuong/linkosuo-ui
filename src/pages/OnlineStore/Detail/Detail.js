import classNames from 'classnames/bind';
import classes from './Detail.module.scss';
import { useParams } from 'react-router-dom';
import { useLayoutEffect, useState, useContext } from 'react';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import CartContext from '~/store/context';

const cx = classNames.bind(classes);

function Detail({ data }) {
    const { productId } = useParams();
    const ctx = useContext(CartContext);
    const [currentProduct, setCurrentProduct] = useState(false);
    const [amount, setAmount] = useState(1);

    const addOne = () => {
        setAmount((prev) => prev + 1);
    };

    const minusOne = () => {
        setAmount((prev) => {
            if (prev === 1) {
                return 1;
            } else {
                return prev - 1;
            }
        });
    };

    const handleUpdateImage = () => {
        if (currentProduct === false) {
            return;
        } else {
            return currentProduct.src.image_1;
        }
    };

    useLayoutEffect(() => {
        const desiredProduct = data.products.find((item) => item.alt === productId);
        setCurrentProduct(desiredProduct);
    }, [data, productId]);

    const handleAddToCart = (event) => {
        event.preventDefault();

        const newProduct = {
            id: currentProduct.alt,
            name: currentProduct.name,
            price: currentProduct.price,
            total: +currentProduct.price,
            image: currentProduct.src.image_1,
            amount: amount,
        };

        ctx.handleAddProduct(newProduct);
    };

    const dietTags = () => {
        if (currentProduct) {
            return currentProduct.diet.map((item, index) => {
                const dietTitle = item.split('-').join(' ');
                return (
                    <p key={index} className={cx('diet-item')}>
                        {dietTitle} &#8226;
                    </p>
                );
            });
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('product-image-section')}>
                    <img src={handleUpdateImage()} alt={currentProduct.alt} className={cx('product-image')} />
                </div>
                <div className={cx('product-info-section')}>
                    <h1 className={cx('product-name')}>{currentProduct.name}</h1>
                    <span className={cx('product-price')}>&euro; {currentProduct.price}</span>
                    <form className={cx('product-form')} onSubmit={handleAddToCart}>
                        {/* <div className={cx('product-size')}></div> */}
                        <div className={cx('product-amount')}>
                            <label className={cx('product-amount')}>Amount:</label>
                            <div className={cx('product-amount-input')}>
                                <div className={cx('product-modify')} onClick={minusOne}>
                                    <FontAwesomeIcon icon={faMinus} className={cx('product-modifier')} />
                                </div>
                                <div className={cx('product-amount-value')}>{amount}</div>
                                <div className={cx('product-modify')} onClick={addOne}>
                                    <FontAwesomeIcon icon={faPlus} className={cx('product-modifier')} />
                                </div>
                            </div>
                        </div>
                        <Button title="Add to basket" className={cx('product-btn')} type="submit" />
                    </form>
                    <div className={cx('product-description')}>
                        <p>{currentProduct.description}</p>
                    </div>
                    <div className={cx('diet-tags')}>{dietTags()}</div>
                </div>
            </div>
        </div>
    );
}

export default Detail;
