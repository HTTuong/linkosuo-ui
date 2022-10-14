import React from 'react';
import classNames from 'classnames/bind';
import classes from './Footer.module.scss';
import FooterBlock from './FooterBlock';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(classes);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <FooterBlock title="Linkosuo Kahvila Oy" address />
                <FooterBlock title="About us" about />
                <FooterBlock title="More information" information />
                <FooterBlock title="Categories" categories />
            </div>
            <div className={cx('brand')}>
                <Link className={cx('brand-title')} to={config.routes.store.home}>
                    © Linkosuon Kahvila Oy
                </Link>
                <span className={cx('brand-subtitle')}>Powered by Shopify</span>
            </div>
        </div>
    );
}

export default React.memo(Footer);
