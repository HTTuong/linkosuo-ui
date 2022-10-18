import React, { useState, useLayoutEffect, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import classes from './Form.module.scss';
import Button from '~/components/Button';
import CartContext from '~/store/context';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(classes);

const validateForm = (formObject) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const nameRegex = /^[a-z ,.'-]+$/i;
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    const keys = Object.keys(formObject);
    let formIsValid = [];
    keys.forEach((key) => {
        if (['firstname', 'lastname', 'holder_name_number', 'country', 'city'].includes(key)) {
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
        if (key === 'address') {
            if (formObject[key].length > 0) {
                formIsValid.push(true);
            } else {
                formIsValid.push(false);
            }
        }
        if (key === 'phone') {
            if (formObject[key].match(phoneRegex)) {
                formIsValid.push(true);
            } else {
                formIsValid.push(false);
            }
        }
        if (key === 'card_number') {
            if (formObject[key].length === 16) {
                formIsValid.push(true);
            } else {
                formIsValid.push(false);
            }
        }
        if (key === 'zip_code') {
            if (formObject[key].length === 5) {
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
    });
    return formIsValid.every((value) => value === true);
};

const Form = React.forwardRef(({ action, checkForSubmission, titleBtn, api, children }, ref) => {
    const [wasSubmitted, setWasSubmitted] = useState(false);
    const navigate = useNavigate();
    const pathRoute = useLocation();
    const ctx = useContext(CartContext);

    useLayoutEffect(() => {
        setWasSubmitted(false);
    }, [pathRoute]);

    useEffect(() => {
        checkForSubmission(wasSubmitted);
    }, [wasSubmitted, checkForSubmission]);

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formValues = Object.fromEntries(formData.entries());
        const formIsValid = validateForm(formValues);
        setWasSubmitted(true);

        if (!formIsValid) {
            return;
        }

        const dataRequest = {
            email: formValues.email,
            fullname: formValues.firstname + ' ' + formValues.lastname,
            country: formValues.country,
            user_address: formValues.address,
            phone_number: formValues.phone,
            payment_info: {
                card_number: formValues.card_number,
                expiration_date: formValues.expiration_date,
                cvv: formValues.cvv,
                holder_name_name: formValues.holder_name_name,
            },
            order: { products: ctx.order.products, total_price: ctx.order.totalAmountPrice },
            pickup_info: {
                pickup_address: ctx.order.address,
                pickup_date: ctx.order.date,
            },
        };

        try {
            const token = localStorage.getItem('access_token');
            let response;
            if (token) {
                response = await axios.post(`${api}/order `, dataRequest, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json',
                    },
                });
            } else {
                response = await axios.post(`${api}/random-order `, dataRequest);
                console.log(response);
            }

            if (action === 'checkout' && response.status === 201) {
                ctx.handleClearProduct();
                navigate(`${config.routes.store.payment}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className={cx('form')} onSubmit={handleSubmitForm} ref={ref} noValidate>
            {children}
            <Button className={cx('form__button')} title={titleBtn} type="submit" />
        </form>
    );
});

export default Form;
