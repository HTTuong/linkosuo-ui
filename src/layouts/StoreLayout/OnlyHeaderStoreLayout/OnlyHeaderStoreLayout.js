import Header from '../components/Header';
import Footer from '../components/Footer';
import classNames from 'classnames/bind';
import classes from './OnlyHeaderStoreLayout.module.scss';
import PropTypes from 'prop-types';
import { NAVBAR_ITEMS } from '~/config/navbar';

const cx = classNames.bind(classes);

function OnlyHeaderStoreLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header navbar={NAVBAR_ITEMS} />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

OnlyHeaderStoreLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default OnlyHeaderStoreLayout;
