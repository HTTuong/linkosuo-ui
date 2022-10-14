import React from 'react';
import classNames from 'classnames/bind';
import classes from './GridProducts.module.scss';
import ImageCard from '~/components/ImageCard';
import PropTypes from 'prop-types';
import config from '~/config';
import CartContext from '~/store/context';

const cx = classNames.bind(classes);

function GridProducts({ products, wrap, center, cols, lastviewwidth, className }) {
    const ctx = React.useContext(CartContext);

    const addLastViewProduct = (product) => {
        const newProduct = {
            _id: product._id,
            name: product.name,
            price: product.price,
            src: product.src,
            alt: product.alt,
            type: product.type,
            subtype: product.subtype,
        };

        ctx.handleAddLastViewProduct(newProduct);
    };

    return (
        <div className={cx('wrapper', { [className]: className })}>
            <div className={cx('products', { wrap, center })}>
                {products.map((product) => (
                    <ImageCard
                        key={Math.random()}
                        cols={cols}
                        lastviewwidth={lastviewwidth}
                        src={product.src}
                        alt={product.alt}
                        name={product.name}
                        price={product.price}
                        to={`${config.routes.collections.collections}/${
                            product.subtype ? product.subtype : product.type
                        }/products/${product._id.toString()}`}
                        onClick={() => {
                            addLastViewProduct(product);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

GridProducts.propTypes = {
    products: PropTypes.array.isRequired,
    wrap: PropTypes.bool,
    className: PropTypes.string,
};

export default React.memo(GridProducts);
