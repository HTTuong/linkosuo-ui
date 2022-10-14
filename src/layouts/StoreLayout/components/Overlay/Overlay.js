import classNames from 'classnames/bind';
import classes from './Overlay.module.scss';

const cx = classNames.bind(classes);

const Overlay = ({ active, zIndex, inactiveFunction }) => {
    return (
        <div
            className={cx('search-overlay', {
                'is-overlay': active,
                'z-index-3': zIndex === '3',
                'z-index-4': zIndex === '4',
            })}
            onClick={inactiveFunction}
        ></div>
    );
};

export default Overlay;
