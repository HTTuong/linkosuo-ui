import React from 'react';
import classNames from 'classnames/bind';
import classes from './Payment.module.scss';
import config from '~/config';
import Button from '~/components/Button';

const cx = classNames.bind(classes);

function Payment() {
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>Thank you !</h3>
            <p className={cx('subtitle')}>Your order was completed successfully.</p>
            <Button title="Return to the home page" className={cx('payment-btn')} to={config.routes.store.home} />
        </div>
    );
}

export default React.memo(Payment);
