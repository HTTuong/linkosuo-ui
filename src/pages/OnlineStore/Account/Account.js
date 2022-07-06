import classNames from 'classnames/bind';
import classes from './Account.module.scss';
import Log from './Log';

const cx = classNames.bind(classes);

function Account() {
    return (
        <div className={cx('wrapper')}>
            <Log />
        </div>
    );
}

export default Account;
