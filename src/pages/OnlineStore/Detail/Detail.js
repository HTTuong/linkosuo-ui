import classNames from 'classnames/bind';
import classes from './Detail.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import Button from '~/components/Button';
import Loading from '~/components/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import CartContext from '~/store/context';
import axios from 'axios';
import { REACT_APP_DOMAIN_API } from '~/constants.d';

const cx = classNames.bind(classes);
const domainApi = REACT_APP_DOMAIN_API;

function Detail() {
    const navigate = useNavigate();
    const pathRoute = useLocation();
    const ctx = React.useContext(CartContext);
    const [currentProduct, setCurrentProduct] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [amount, setAmount] = React.useState(1);

    const addOne = React.useCallback(() => {
        setAmount((prev) => prev + 1);
    }, []);

    const minusOne = React.useCallback(() => {
        setAmount((prev) => {
            if (prev === 1) {
                return 1;
            } else {
                return prev - 1;
            }
        });
    }, []);

    const handleUpdateImage = () => {
        if (currentProduct === false) {
            return;
        } else {
            return currentProduct.src.image_1;
        }
    };

    React.useLayoutEffect(() => {
        setIsLoading(true);
        axios
            .get(domainApi + pathRoute.pathname)
            .then((product) => {
                setCurrentProduct(product.data.product);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                if (error.message === 'Network Error') {
                    navigate('/linkosuo-ui/*', { replace: true }); // server down
                }
                if (error.response.status === 404) {
                    navigate('/linkosuo-ui/*', { replace: true }); // not found
                }
            });
    }, [pathRoute, navigate]);

    const handleAddToCart = (event) => {
        event.preventDefault();

        const newProduct = {
            _id: currentProduct._id,
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
        <div className={cx('wrapper', { loading: isLoading })}>
            <div className={cx('inner')}>
                {!isLoading && (
                    <>
                        <div className={cx('product-image-section')}>
                            <img src={handleUpdateImage()} alt={currentProduct.alt} className={cx('product-image')} />
                        </div>
                        <div className={cx('product-info-section')}>
                            <h1 className={cx('product-name')}>{currentProduct.name}</h1>
                            <span className={cx('product-price')}>&euro; {currentProduct.price}</span>
                            <form className={cx('product-form')} onSubmit={handleAddToCart}>
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
                    </>
                )}
                {isLoading && <Loading />}
            </div>
        </div>
    );
}

export default React.memo(Detail);
