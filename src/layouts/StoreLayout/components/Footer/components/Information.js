import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import classes from '../Footer.module.scss';
import config from '~/config';

const cx = classNames.bind(classes);

const LINK_LIST = [
    {
        title: 'Contact information',
        to: config.routes.store.contact,
    },
    {
        title: 'Frequently asked Questions',
        to: config.routes.store.home,
    },
    {
        title: 'Payment methods',
        to: config.routes.store.home,
    },
    {
        title: 'Delivery and return conditions',
        to: config.routes.store.home,
    },
    {
        title: 'Information about cafes and restaurants',
        to: config.routes.store.home,
    },
    {
        title: 'Linkosuo.fi',
        to: config.routes.store.home,
    },
    {
        title: 'Data Protection and Registry Statement',
        to: config.routes.store.home,
    },
];

function Information() {
    return (
        <ul className={cx('information')}>
            {LINK_LIST.map((item, index) => (
                <li key={index}>
                    <Link className={cx('information-item')} to={item.to}>
                        {item.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default Information;
