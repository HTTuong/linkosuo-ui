import Header from '../components/Header';
import Footer from '../components/Footer';
import classNames from 'classnames/bind';
import classes from './DefaultLayout.module.scss';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import React from 'react';
import { authActions } from '~/store/redux/auth';
import Modal from '../components/Modal';
import axios from 'axios';
import LastView from '../components/LastView';
import CartContext from '~/store/context';
import { REACT_APP_API } from '~/constants.d';

const cx = classNames.bind(classes);
const api = REACT_APP_API;

function DefaultLayout({ children }) {
    const token = localStorage.getItem('access_token');
    const [expireMessage, setExpireMessage] = React.useState('');
    const dispatch = useDispatch();
    const ctx = React.useContext(CartContext);
    const pathRoute = useLocation();

    React.useLayoutEffect(() => {
        let validateToken;

        if (token) {
            axios
                .get(api + '/account/jwt', {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                })
                .then((response) => {
                    localStorage.setItem('access_token', response.data.token);
                    dispatch(authActions.addLoginInfo({ token: response.data.token }));
                    return response.data.token;
                })
                .then((token) => {
                    validateToken = setTimeout(async () => {
                        const response = await axios.get(api + '/account/validate-jwt', {
                            headers: {
                                Authorization: 'Bearer ' + token,
                            },
                        });

                        if (response.status === 200) {
                            dispatch(authActions.removeLoginInfo());
                            localStorage.removeItem('access_token');

                            // Disable scrollbar to show expired modal
                            const bodyElement = document.querySelector('body');
                            bodyElement.classList.add('disable-scrollbar');
                            setExpireMessage(response.data.message);
                        }
                    }, 3600 * 1000);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        return () => {
            clearTimeout(validateToken);
        };
    }, [token, dispatch]);

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            {ctx.lastViewedProducts.length > 1 && ['collections'].includes(pathRoute.pathname.split('/')[2]) && (
                <LastView />
            )}
            <Footer />
            {expireMessage && <Modal message={expireMessage} closeMessage={setExpireMessage} />}
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
