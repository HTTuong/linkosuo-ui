import React from 'react';
import classNames from 'classnames/bind';
import classes from '../Footer.module.scss';

const cx = classNames.bind(classes);

function About() {
    return (
        <div className={cx('about')}>
            <p className={cx('paragraph')}>
                Linkosuo is an over 80-year-old family business whose business is still managed by the founding family.
                We continue the tasty mission of our founders Aarne and Elsa Linkosuo, which began in Tampere in 1936.
                We prepare all our products in our own kitchen and pastry shop in Kangasa.
            </p>
            <p className={cx('paragraph')}>
                Baked into the core of our operations is the promise of quality and courage, which you can taste in our
                products every day. It is important for us to create delicious moments for our customers and to
                accompany them along life.
            </p>
        </div>
    );
}

export default React.memo(About);
