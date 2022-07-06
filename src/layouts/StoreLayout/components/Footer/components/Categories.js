import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import classes from '../Footer.module.scss';
import config from '~/config';

const cx = classNames.bind(classes);

const CATEGORIES_LIST = [
    {
        title: 'Cakes',
        to: config.routes.store.cake,
    },
    {
        title: 'Coffee cakes and buns',
        to: config.routes.store.buns,
    },
    {
        title: 'Pies',
        to: config.routes.store.pie,
    },
    {
        title: 'Salads',
        to: config.routes.store.salad,
    },
    {
        title: 'Omelet rolls',
        to: config.routes.store.roll,
    },
    {
        title: 'Sandwich cakes',
        to: config.routes.store.sandwich,
    },
    {
        title: 'Round roasts',
        to: config.routes.store.roast,
    },
];

function Categories() {
    return (
        <ul className={cx('categories')}>
            {CATEGORIES_LIST.map((item, index) => (
                <li key={index}>
                    <Link className={cx('information-item')} to={item.to}>
                        {item.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default Categories;
