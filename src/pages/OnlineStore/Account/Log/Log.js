import classNames from 'classnames/bind';
import { useState } from 'react';
import Button from '~/components/Button';
import classes from './Log.module.scss';

const cx = classNames.bind(classes);

function Log() {
    const [email, setEmail] = useState('');
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [password, setPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState(true);

    const [register, setRegister] = useState(false);

    const validateEmail = () => {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (email) {
            if (email.match(validRegex)) {
                setEmailIsValid(true);
            } else {
                setEmailIsValid(false);
            }
        }
    };

    const validatePassword = () => {
        if (password) {
            if (password.length >= 6) {
                setPasswordIsValid(true);
            } else {
                setPasswordIsValid(false);
            }
        }
    };

    const handleChangeEmail = (event) => {
        setEmailIsValid(true);
        if (event.target.value.startsWith(' ')) {
            return;
        }
        setEmail(event.target.value);
    };

    const handleChangePassword = (event) => {
        setPasswordIsValid(true);
        if (event.target.value.startsWith(' ')) {
            return;
        }
        setPassword(event.target.value);
    };

    return (
        <div className={cx('section')}>
            <span className={cx('title')}>{register ? 'Sign up' : 'Log in'}</span>
            <span className={cx('subtitle')}>Enter your email address and password</span>
            <form className={cx('form')}>
                <div className={cx('form__item')}>
                    <input
                        type="text"
                        className={cx('form__email')}
                        value={email}
                        placeholder="Email address"
                        onChange={handleChangeEmail}
                        onBlur={validateEmail}
                    />
                    {!emailIsValid && <span className={cx('form__invalid-message')}>Email is invalid</span>}
                </div>
                <div className={cx('form__item')}>
                    <input
                        type="password"
                        className={cx('form__password')}
                        value={password}
                        placeholder="Password"
                        onChange={handleChangePassword}
                        onBlur={validatePassword}
                    />
                    {!passwordIsValid && (
                        <span className={cx('form__invalid-message')}>Password must be at least 6 characters</span>
                    )}
                    {!register && <span className={cx('form__forgot-password')}>Forgot your password?</span>}
                </div>
                <Button className={cx('form__button')} title={register ? 'Sign up' : 'Log in'} type="submit" />
            </form>
            {!register && (
                <div className={cx('register')}>
                    <span className={cx('register__title')}>Don't have an account?</span>
                    <span className={cx('register__link')} onClick={() => setRegister(true)}>
                        Register here
                    </span>
                </div>
            )}
        </div>
    );
}

export default Log;
