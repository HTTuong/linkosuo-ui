import classNames from 'classnames/bind';
import classes from './GridProducts.module.scss';
import ImageCard from '~/components/ImageCard';
import PropTypes from 'prop-types';
import config from '~/config';

const cx = classNames.bind(classes);

function GridProducts({ products, wrap, className }) {
    return (
        <div className={cx('wrapper', { [className]: className })}>
            <div className={cx('products', { wrap })}>
                {products.map((item, index) => (
                    <ImageCard
                        key={index}
                        src={item.src}
                        alt={item.alt}
                        name={item.name}
                        price={item.price}
                        to={`${config.routes.store.product}${item.alt}`}
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

export default GridProducts;
