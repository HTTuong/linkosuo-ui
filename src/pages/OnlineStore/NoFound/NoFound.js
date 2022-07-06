import classNames from 'classnames/bind';
import Button from '~/components/Button';
import classes from './NoFound.module.scss';
import config from '~/config';

const cx = classNames.bind(classes);

function NoFound() {
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>Unfortunately, the page cannot be displayed.</h3>
            <p className={cx('subtitle')}>Unfortunately the website you were looking for can not be found.</p>
            <Button title="Return to the home page" className={cx('nofound-btn')} to={config.routes.store.home} />
        </div>
    );
}

export default NoFound;
