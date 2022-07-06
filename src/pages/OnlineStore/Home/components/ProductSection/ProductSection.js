import useScrollAnimation from '~/hooks/useScrollAnimation';
import classNames from 'classnames/bind';
import classes from './ProductSection.module.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const cx = classNames.bind(classes);

function ProductSection({ image, subTitle, title, content, titleLink, to }) {
    const animateImage = useScrollAnimation(1000);

    return (
        <div className={cx('section')}>
            <div className={cx('section__image')}>
                <img className={cx('section__image-product', { active: animateImage })} src={image} alt="sandwich" />
            </div>
            <div className={cx('section__info')}>
                <div className={cx('info-content')}>
                    <h3 className={cx('info-content__subtitle')}>{subTitle}</h3>
                    <h2 className={cx('info-content__title')}>{title}</h2>
                    <div className={cx('info-content__about')}>{content}</div>
                    <Link className={cx('info-content__products')} to={to}>
                        {titleLink}
                    </Link>
                </div>
            </div>
        </div>
    );
}

ProductSection.propTypes = {
    image: PropTypes.string,
    subTitle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    titleLink: PropTypes.string.isRequired,
    to: PropTypes.string,
};

export default ProductSection;
