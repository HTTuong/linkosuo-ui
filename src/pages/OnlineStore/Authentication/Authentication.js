import classNames from 'classnames/bind';
import classes from './Authentication.module.scss';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import config from '~/config';
import Form from './components/Form';

const cx = classNames.bind(classes);

function Authentication() {
    const pathRoute = useLocation();
    const navigate = useNavigate();
    const action = pathRoute.pathname.split('/')[3];
    const isRegister = action === 'register';
    const [messageFromResponse, setMessageFromResponse] = React.useState('');

    const handleTitlePage = React.useCallback(() => {
        switch (action) {
            case 'register':
                return { title: 'Sign up', description: 'Please fill in the information below' };
            case 'login':
                return { title: 'Log in', description: 'Enter your email address and password' };
            case 'forgot-password':
                return { title: 'Reset password', description: 'Please enter your email address' };
            case 'change-password':
                return { title: 'Reset password', description: 'Please enter your new password' };
            default:
                break;
        }
    }, [action]);

    const handleChangeAuthActions = React.useCallback(() => {
        if (action === 'register') {
            navigate(`${config.routes.account.login}`);
        } else {
            navigate(`${config.routes.account.register}`);
        }
        setMessageFromResponse('');
    }, [navigate, action]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <span className={cx('title')}>{handleTitlePage().title}</span>
                <span className={cx('subtitle')}>{handleTitlePage().description}</span>
                {messageFromResponse && (
                    <span
                        className={cx('message-section', {
                            success: ['User created successfully', 'Password changed successfully'].includes(
                                messageFromResponse,
                            ),
                        })}
                    >
                        <h3 className={cx('message', { success: messageFromResponse === 'User created successfully' })}>
                            {messageFromResponse}
                        </h3>
                    </span>
                )}
                <Form action={action} setMessageFromResponse={setMessageFromResponse} />
                {action === 'login' && (
                    <span
                        className={cx('form__forgot-password')}
                        onClick={() => {
                            navigate(config.routes.account.forgot);
                            setMessageFromResponse('');
                        }}
                    >
                        Forgot your password?
                    </span>
                )}
                {!isRegister && (
                    <div className={cx('register')}>
                        <span className={cx('register__title')}>Don't have an account?</span>
                        <span className={cx('register__link')} onClick={handleChangeAuthActions}>
                            Register here
                        </span>
                    </div>
                )}
                {isRegister && (
                    <div className={cx('register')}>
                        <span className={cx('register__title')}>Already have an account?</span>
                        <span className={cx('register__link')} onClick={handleChangeAuthActions}>
                            Login here
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default React.memo(Authentication);
