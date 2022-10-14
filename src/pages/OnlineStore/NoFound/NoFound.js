import React from 'react';
import classNames from 'classnames/bind';
import classes from './NoFound.module.scss';

const cx = classNames.bind(classes);

function NoFound() {
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>Page not found</h3>
            <p className={cx('subtitle')}>Unfortunately the website you were looking for can not be found.</p>
        </div>
    );
}

export default React.memo(NoFound);
