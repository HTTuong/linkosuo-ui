import React from 'react';
import classNames from 'classnames/bind';
import classes from './ShowProducts.module.scss';
import GridProducts from '~/components/GridProducts';
import config from '~/config';
import Button from '~/components/Button';
import PropTypes from 'prop-types';

const cx = classNames.bind(classes);
const bodyELement = document.querySelector('body');

const getProductBySubtype = (products, subtypes) => {
    let result = [];
    subtypes.forEach((subtype) => {
        const filteredProducts = products.filter((product) => {
            return product.subtype === subtype;
        });
        result.push(filteredProducts.slice(0, 4));
    });

    return result;
};

const generateTitle = (title) => {
    if (title.includes('-')) {
        return title.split('-').join(' ');
    }
    return title;
};

function ShowProducts({ options, productsList, title }) {
    const [activeOption, setActiveOption] = React.useState(options[0]);
    const [products, setProducts] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [colsNumber, setColsNumber] = React.useState(4);

    React.useLayoutEffect(() => {
        setIsLoading(true);
        try {
            const products = getProductBySubtype(productsList, options);
            if (products.length > 0) {
                setProducts(products);
                setIsLoading(false);
            } else {
                throw new Error('Cannot fetch products');
            }

            if (bodyELement.clientWidth <= 1180) {
                setColsNumber(2);
            } else {
                setColsNumber(4);
            }
        } catch (error) {
            console.log(error);
        }
    }, [productsList, options]);

    React.useEffect(() => {
        const changeColumsNumber = window.addEventListener('resize', () => {
            if (bodyELement.clientWidth <= 1180) {
                setColsNumber(2);
            } else {
                setColsNumber(4);
            }
        });

        return () => {
            bodyELement.removeEventListener('resize', changeColumsNumber);
        };
    }, []);

    const renderOptions = React.useCallback(() => {
        return options.map((option) => (
            <button
                key={Math.random()}
                className={cx('options-title', { active: activeOption === option })}
                onClick={() => setActiveOption(option)}
            >
                {generateTitle(option)}
            </button>
        ));
    }, [options, activeOption]);

    const renderProducts = React.useCallback(() => {
        return products.map((list, index) => (
            <GridProducts
                key={index}
                products={list}
                cols={colsNumber}
                wrap={bodyELement.clientWidth <= 1180 ? true : false}
                className={cx('animated-product', { active: activeOption === options[index] })}
            />
        ));
    }, [products, activeOption, colsNumber, options]);

    const changeProductButton = React.useCallback(() => {
        const collectionPath = config.routes.collections.collections;
        const productOption = activeOption.includes(' ')
            ? activeOption.split(' ').join('-').toLowerCase() // remove space in option and transform to url pathname
            : activeOption.toLowerCase();

        return `${collectionPath}/${productOption}`;
    }, [activeOption]);

    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>{title}</span>
            <div className={cx('options')}>{renderOptions()}</div>
            {isLoading && (
                <div className={cx('loading-section')}>
                    <div className={cx('loading-title')}>Loading...</div>
                    <div className={cx('loading-box')}>
                        <div className={cx('loading-bar')}></div>
                    </div>
                </div>
            )}
            {!isLoading && <div className={cx('product-list')}>{renderProducts()}</div>}
            <Button
                to={changeProductButton()}
                title={`SHOW ALL ${generateTitle(activeOption)}`}
                className={cx('show-products-btn')}
            />
        </div>
    );
}

ShowProducts.propTypes = {
    options: PropTypes.array,
    productsList: PropTypes.array,
    title: PropTypes.string.isRequired,
};

export default React.memo(ShowProducts);
