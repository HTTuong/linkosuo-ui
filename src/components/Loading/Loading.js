import classNames from 'classnames/bind';
import classes from './Loading.module.scss';

const cx = classNames.bind(classes);

const Loading = () => {
    return (
        <div className={cx('loading-section')}>
            <div className={cx('loading-title')}>Loading...</div>
            <div className={cx('loading-box')}>
                <div className={cx('loading-bar')}></div>
            </div>
        </div>
    );
};

export default Loading;
