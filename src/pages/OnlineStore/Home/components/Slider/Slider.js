import React from 'react';
import classNames from 'classnames/bind';
import classes from './Slider.module.scss';
import Button from '~/components/Button';
import PropTypes from 'prop-types';
import config from '~/config';

const cx = classNames.bind(classes);

function Slider({ image, title, subTitle }) {
    const [animateIntro, setAnimateIntro] = React.useState(false);

    React.useEffect(() => {
        const animateIntro = setTimeout(() => {
            setAnimateIntro(true);
        }, 600);

        return () => {
            clearInterval(animateIntro);
        };
    }, []);

    return (
        <div className={cx('slider')}>
            <img className={cx('slider-image')} src={image} alt="cake" />
            <div className={cx('introduction')}>
                <span className={cx('introduction-subtitle', { animation: animateIntro })}>{subTitle}</span>
                <span className={cx('introduction-title', { animation: animateIntro })}>{title}</span>
                <Button
                    className={cx('introduction-btn', { animation: animateIntro })}
                    title="Check out the products"
                    to={config.routes.collections.event}
                />
            </div>
        </div>
    );
}

Slider.propTypes = {
    images: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.string,
};

export default Slider;
