import { useState } from 'react';
import classNames from 'classnames/bind';
import classes from './ShowProducts.module.scss';
import GridProducts from '~/components/GridProducts';
import Button from '~/components/Button';
import PropTypes from 'prop-types';

const cx = classNames.bind(classes);

function ShowProducts({ options, productsList1, productsList2, title, buttonLink }) {
    const [activeOption, setActiveOption] = useState(options[0].title);

    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>{title}</span>
            <div className={cx('options')}>
                {options.map((item, index) => (
                    <button
                        key={index}
                        className={cx('options-title', { active: activeOption === item.title })}
                        onClick={() => setActiveOption(item.title)}
                    >
                        {item.title}
                    </button>
                ))}
            </div>
            <div className={cx('product-list')}>
                <GridProducts
                    products={productsList1}
                    className={cx('animated-product', { active: activeOption === options[0].title })}
                />
                <GridProducts
                    products={productsList2}
                    className={cx('animated-product', { active: activeOption === options[1].title })}
                />
            </div>
            <Button
                to={
                    buttonLink +
                    `${
                        activeOption.includes(' ')
                            ? activeOption.split(' ').join('-').toLowerCase() // remove space in option and transform to url pathname
                            : activeOption.toLowerCase()
                    }`
                }
                title={`SHOW ALL ${activeOption}`}
                className={cx('show-products-btn')}
            />
        </div>
    );
}

ShowProducts.propTypes = {
    options: PropTypes.array.isRequired,
    productsList1: PropTypes.array.isRequired,
    productsList2: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    buttonLink: PropTypes.string,
};

export default ShowProducts;
