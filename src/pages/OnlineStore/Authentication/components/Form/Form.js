import React from 'react';
import classNames from 'classnames/bind';
import classes from './Form.module.scss';
import Button from '~/components/Button';
import Input from '../Input';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { authActions } from '~/store/redux/auth';
import config from '~/config';
import { REACT_APP_API } from '~/constants.d';

const cx = classNames.bind(classes);
const api = REACT_APP_API;

const validateName = (name) => {
    const regex = /^[a-z ,.'-]+$/i;
    if (name) {
        if (name.match(regex)) {
            return null;
        } else {
            return 'Invalid name';
        }
    } else {
        return 'This field is required';
    }
};

const validateEmail = (email) => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email) {
        if (email.match(validRegex)) {
            return null;
        } else {
            return 'Invalid email address';
        }
    } else {
        return 'Please enter a valid email address';
    }
};

const validatePassword = (password) => {
    if (password) {
        if (password.length >= 6) {
            return null;
        } else {
            return 'Password must be at least 6 characters';
        }
    } else {
        return 'This field is required';
    }
};

const validateForm = (formObject) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const nameRegex = /^[a-z ,.'-]+$/i;
    const keys = Object.keys(formObject);
    let formIsValid = [];
    keys.forEach((key) => {
        if (key === 'firstname' || key === 'lastname') {
            if (formObject[key].match(nameRegex) && formObject[key].length > 0) {
                formIsValid.push(true);
            } else {
                formIsValid.push(false);
            }
        }
        if (key === 'email') {
            if (formObject[key].match(emailRegex)) {
                formIsValid.push(true);
            } else {
                formIsValid.push(false);
            }
        }
        if (key === 'password') {
            if (formObject[key].length >= 6) {
                formIsValid.push(true);
            } else {
                formIsValid.push(false);
            }
        }
        if (key === 'confirm-password') {
            if (formObject[key] === formObject.password) {
                formIsValid.push(true);
            } else {
                formIsValid.push(false);
            }
        }
    });
    return formIsValid.every((value) => value === true);
};

const Form = ({ action, setMessageFromResponse }) => {
    const [wasSubmitted, setWasSubmitted] = React.useState(false);
    const navigate = useNavigate();
    const pathRoute = useLocation();

    const passwordRef = React.useRef();

    const dispatch = useDispatch();

    React.useLayoutEffect(() => {
        setWasSubmitted(false);
    }, [pathRoute]);

    const handleTitleButton = React.useCallback(() => {
        switch (action) {
            case 'register':
                return 'Sign up';
            case 'login':
                return 'Log in';
            case 'forgot-password':
                return 'Reset password';
            case 'change-password':
                return 'Confirm';
            default:
                break;
        }
    }, [action]);

    const validateConfirmPassword = (enteredConfirmPassword) => {
        let password = passwordRef.current ? passwordRef.current.getValue() : null;
        if (enteredConfirmPassword) {
            if (enteredConfirmPassword === password) {
                return null;
            } else {
                return 'Confirm password does not match';
            }
        } else {
            return 'This field is required';
        }
    };

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formValues = Object.fromEntries(formData.entries());
        const formIsValid = validateForm(formValues);
        setWasSubmitted(true);
        if (!formIsValid) {
            return;
        }

        try {
            const response = await axios.post(
                `${api}/account/${action}${action === 'change-password' ? '/' + pathRoute.pathname.split('/')[4] : ''}`,
                {
                    firstname: formValues.firstname,
                    lastname: formValues.lastname,
                    email: formValues.email,
                    password: formValues.password,
                    confirm_password: formValues['confirm-password'],
                },
            );
            setMessageFromResponse('');

            if (action === 'register' && response.status === 201) {
                navigate(`${config.routes.account.login}`);
                setMessageFromResponse('User created successfully');
            }
            if (action === 'login' && response.status === 200) {
                localStorage.setItem('access_token', response.data.token);
                dispatch(authActions.addLoginInfo({ token: response.data.token }));
                navigate(`${config.routes.store.home}`, { replace: true });
                window.location.reload();
            }
            if (action === 'forgot-password' && response.status === 200) {
                navigate(`${config.routes.account.changepwd}/${response.data.id}`, { replace: true });
                setMessageFromResponse('');
            }
            if (action === 'change-password' && response.status === 200) {
                navigate(`${config.routes.account.login}`);
                setMessageFromResponse('Password changed successfully');
            }

            if (action === 'register') {
                navigate(`${config.routes.account.login}`);
                setMessageFromResponse('User created successfully');
            }
            if (action === 'login') {
                localStorage.setItem('access_token', response.data.token);
                dispatch(authActions.addLoginInfo({ token: response.data.token }));
                navigate(`${config.routes.store.home}`, { replace: true });
                window.location.reload();
            }
            if (action === 'forgot-password') {
                navigate(`${config.routes.account.changepwd}/${response.data.id}`, { replace: true });
                setMessageFromResponse('');
            }
            if (action === 'change-password') {
                navigate(`${config.routes.account.login}`);
                setMessageFromResponse('Password changed successfully');
            }
        } catch (error) {
            console.log(error);
            let errorMessage;

            if (error.response.status === 422) {
                errorMessage = error.response.data.message;
                setMessageFromResponse(errorMessage);
            }
            if (error.response.status === 0) {
                navigate(`${config.routes.others.nofound}`);
            }
        }
    };

    return (
        <form className={cx('form')} onSubmit={handleSubmitForm} noValidate>
            {action === 'register' && (
                <Input
                    labelTitle="First name"
                    name="firstname"
                    type="text"
                    placeholder="First name"
                    validateFunc={validateName}
                    wasSubmitted={wasSubmitted}
                    setWasSubmitted={setWasSubmitted}
                />
            )}
            {action === 'register' && (
                <Input
                    labelTitle="Last name"
                    name="lastname"
                    type="text"
                    placeholder="Last name"
                    validateFunc={validateName}
                    wasSubmitted={wasSubmitted}
                    setWasSubmitted={setWasSubmitted}
                />
            )}
            {['register', 'login', 'forgot-password'].includes(action) && (
                <Input
                    labelTitle="Email address"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    validateFunc={validateEmail}
                    wasSubmitted={wasSubmitted}
                    setWasSubmitted={setWasSubmitted}
                />
            )}
            {['register', 'login', 'change-password'].includes(action) && (
                <Input
                    labelTitle="Password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    validateFunc={validatePassword}
                    wasSubmitted={wasSubmitted}
                    ref={passwordRef}
                    setWasSubmitted={setWasSubmitted}
                />
            )}
            {['change-password'].includes(action) && (
                <Input
                    labelTitle="Confirm new password"
                    name="confirm-password"
                    type="password"
                    placeholder="Confirm new password"
                    validateFunc={validateConfirmPassword}
                    wasSubmitted={wasSubmitted}
                    setWasSubmitted={setWasSubmitted}
                />
            )}

            <Button className={cx('form__button')} title={handleTitleButton()} type="submit" />
        </form>
    );
};

export default Form;
