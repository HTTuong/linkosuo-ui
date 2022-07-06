import classNames from 'classnames/bind';
import { useState } from 'react';
import Button from '~/components/Button';
import classes from './Contact.module.scss';

const cx = classNames.bind(classes);

const INFORMATION_CONTENT = {
    heading: 'Contact information',
    info_1: 'Orders can be picked up on weekdays according to opening hours. Choose a pickup time when ordering.',
    info_2: 'Due to the transport delay on Saturdays, orders can generally be picked up one hour after opening. Please check the opening hours on our website: linkosuonkavilat.fi',
    info_3: 'If you want home delivery of the products, please contact our party and meeting services before placing the order:',
    email: 'juhlpapalvelut@linkosuo.fi',
    workingTime:
        'In other matters, you can contact us via the form below and we will get back to you. We respond to inquiries Mon-Fri between 9am and 3pm.',
};

function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberIsValid, setPhoneNumberIsValid] = useState(true);

    const handleChangeName = (event) => {
        if (event.target.value.startsWith(' ')) {
            return;
        }
        setName(event.target.value);
    };

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleChangeMessage = (event) => {
        setMessage(event.target.value);
    };

    const handleChangePhoneNumber = (event) => {
        if (event.target.value.startsWith(' ')) {
            return;
        }
        setPhoneNumberIsValid(true);
        setPhoneNumber(event.target.value);
    };

    const validatePhoneNumber = () => {
        // eslint-disable-next-line no-useless-escape
        const validRegex = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
        if (phoneNumber.length > 0) {
            if (phoneNumber.match(validRegex)) {
                setPhoneNumberIsValid(true);
            } else {
                setPhoneNumberIsValid(false);
            }
        }
    };

    const handleSubmitForm = (event) => {
        event.preventDefault();
        if (phoneNumberIsValid && name.length > 0 && email.includes('@') && message.length > 0) {
            setName('');
            setEmail('');
            setPhoneNumber('');
            setPhoneNumberIsValid(true);
            setMessage('');
        } else {
            alert('Please check your information again !');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('heading')}>
                <h2 className={cx('heading__title')}>{INFORMATION_CONTENT.heading}</h2>
            </div>
            <div className={cx('information')}>
                <span className={cx('information__item')}>{INFORMATION_CONTENT.info_1}</span>
                <span className={cx('information__item')}>{INFORMATION_CONTENT.info_2}</span>
                <div className={cx('information__seperate')}></div>
                <span className={cx('information__item')}>{INFORMATION_CONTENT.info_3}</span>
                <span className={cx('information__item--light')}>{INFORMATION_CONTENT.email}</span>
                <span className={cx('information__item--light')}>{INFORMATION_CONTENT.workingTime}</span>
            </div>
            <form className={cx('form')} onSubmit={handleSubmitForm}>
                <div className={cx('section')}>
                    <input
                        type="text"
                        value={name}
                        className={cx('input-item')}
                        placeholder="Your name"
                        onChange={handleChangeName}
                    />
                    <input
                        type="email"
                        value={email}
                        className={cx('input-item')}
                        placeholder="Your mail address"
                        onChange={handleChangeEmail}
                    />
                </div>
                <input
                    type="text"
                    value={phoneNumber}
                    className={cx('input-item')}
                    placeholder="Phone number (optional)"
                    onChange={handleChangePhoneNumber}
                    onBlur={validatePhoneNumber}
                />
                {!phoneNumberIsValid && <span className={cx('warning')}>Phone number is invalid</span>}
                <textarea
                    type="text"
                    value={message}
                    className={cx('message-item')}
                    placeholder="Message"
                    onChange={handleChangeMessage}
                />
                <Button title="Send a message" className={cx('button')} />
            </form>
        </div>
    );
}

export default Contact;
