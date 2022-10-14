import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import classes from '../Footer.module.scss';
import config from '~/config';

const cx = classNames.bind(classes);

const CATEGORIES_LIST = [
    {
        title: 'Cakes',
        to: config.routes.collections.cake,
    },
    {
        title: 'Coffee cakes and buns',
        to: config.routes.collections.buns,
    },
    {
        title: 'Pies',
        to: config.routes.collections.pies,
    },
    {
        title: 'Salads',
        to: config.routes.collections.salads,
    },
    {
        title: 'Omelet rolls',
        to: config.routes.collections.roll,
    },
    {
        title: 'Sandwich cakes',
        to: config.routes.collections.sandwich,
    },
    {
        title: 'Round roasts',
        to: config.routes.collections.roast,
    },
];

function Categories() {
    const renderCategories = React.useCallback(() => {
        return CATEGORIES_LIST.map((item) => (
            <li key={Math.random()}>
                <Link className={cx('information-item')} to={item.to}>
                    {item.title}
                </Link>
            </li>
        ));
    }, []);

    return <ul className={cx('categories')}>{renderCategories()}</ul>;
}

export default React.memo(Categories);
