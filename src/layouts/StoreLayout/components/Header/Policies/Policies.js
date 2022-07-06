import classNames from 'classnames/bind';
import classes from './Policies.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(classes);

function Policies() {
    return (
        <Link to={config.routes.store.policy} className={cx('policies')}>
            <span className={cx('policies__order')}>
                Order online and pick up at the cafe or restaurant of your choice | Order time 3 working days
            </span>
        </Link>
    );
}

export default Policies;
