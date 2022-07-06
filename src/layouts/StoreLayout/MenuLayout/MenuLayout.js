import Header from '../components/Header';
import Footer from '../components/Footer';
import classNames from 'classnames/bind';
import classes from './MenuLayout.module.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(classes);

function MenuLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

MenuLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MenuLayout;
