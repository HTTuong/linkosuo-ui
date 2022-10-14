import React from 'react';
import classNames from 'classnames/bind';
import classes from './Footer.module.scss';
import Address from './components/Address';
import About from './components/About';
import Information from './components/Information';
import Categories from './components/Categories';
import PropTypes from 'prop-types';

const cx = classNames.bind(classes);

function FooterBlock({ title, address, about, information, categories }) {
    return (
        <div className={cx('block')}>
            <div className={cx('title')}>{title}</div>
            {address && <Address />}
            {about && <About />}
            {information && <Information />}
            {categories && <Categories />}
        </div>
    );
}

FooterBlock.propTypes = {
    title: PropTypes.string.isRequired,
    address: PropTypes.bool,
    about: PropTypes.bool,
    information: PropTypes.bool,
    categories: PropTypes.bool,
};

export default React.memo(FooterBlock);
