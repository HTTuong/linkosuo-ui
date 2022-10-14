import React from 'react';
import classNames from 'classnames/bind';
import classes from './ImageCard.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';

const cx = classNames.bind(classes);

function ImageCard({ to, href, price, className, src, alt, name, lastviewwidth, cols, ...passProps }) {
    const [hover, setHover] = useState(false);
    let Comp = 'div';

    const props = {
        ...passProps,
    };

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classCard = cx('wrapper', {
        [className]: className,
        'col-1-4': cols === 4,
        'col-1-3': cols === 3,
        'col-1-2': cols === 2,
        'width-250': lastviewwidth,
    });

    const handleChangeImage = () => {
        let image = src.image_1;
        if (hover) {
            if (src.image_2) {
                image = src.image_2;
            }
        }
        return image;
    };

    return (
        <Comp className={classCard} {...props} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <img src={handleChangeImage()} alt={alt} className={cx('product-image')} />
            {name && price && (
                <div className={cx('product-info')}>
                    <span className={cx('product-name')}>{name}</span>
                    <div className={cx('product-price', { hover: hover })}>Starting at &euro; {price}</div>
                </div>
            )}
        </Comp>
    );
}

ImageCard.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    price: PropTypes.string,
    className: PropTypes.string,
    src: PropTypes.object,
    alt: PropTypes.string,
    name: PropTypes.string,
    passProps: PropTypes.array,
};

export default React.memo(ImageCard);
