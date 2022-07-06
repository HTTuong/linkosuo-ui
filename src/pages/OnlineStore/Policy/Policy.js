import classNames from 'classnames/bind';
import classes from './Policy.module.scss';
import config from '~/config';
import Button from '~/components/Button';

const cx = classNames.bind(classes);

function Policy() {
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>Sorry</h3>
            <p className={cx('subtitle')}>This page will be updated soon.</p>
            <Button title="Return to the home page" className={cx('navigate-btn')} to={config.routes.store.home} />
        </div>
    );
}

export default Policy;
