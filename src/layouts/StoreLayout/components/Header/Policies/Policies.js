import React from 'react';
import classNames from 'classnames/bind';
import classes from './Policies.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(classes);

function Policies() {
    return (
        <Link id="policy" to={config.routes.policies.shipping} className={cx('policies')}>
            <div className={cx('policies__order')}>
                Order online and pick up at the cafe or restaurant of your choice | Order time 3 working days
            </div>
        </Link>
        // <div className={cx('policies')}>
        //     <Link to={config.routes.policies.shipping} className={cx('policies__order')}>
        //         Order online and pick up at the cafe or restaurant of your choice | Order time 3 working days
        //     </Link>
        // </div>
    );
}

export default React.memo(Policies);
