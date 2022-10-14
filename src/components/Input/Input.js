import React from 'react';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import classes from './Input.module.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(classes);

const Input = React.forwardRef(({ labelTitle, name, type, placeholder, validateFunc, wasSubmitted }, ref) => {
    const pathRoute = useLocation();
    const [enteredValue, setEnteredValue] = React.useState('');
    const [isTouched, setIsTouched] = React.useState(false);
    const errorMessage = validateFunc(enteredValue);
    const displayErrorMessage = wasSubmitted || isTouched;

    React.useLayoutEffect(() => {
        setEnteredValue('');
        setIsTouched(false);
    }, [pathRoute]);

    const handleChangeValue = React.useCallback((event) => {
        setEnteredValue(event.target.value);
    }, []);

    const handleTouchInput = React.useCallback(() => {
        setIsTouched(true);
    }, []);

    return (
        <>
            <div key={name} className={cx('form__item')}>
                <input
                    id={`${name}_input`}
                    type={type}
                    className={cx('form__input')}
                    name={name}
                    value={enteredValue}
                    placeholder={placeholder}
                    onChange={handleChangeValue}
                    onBlur={handleTouchInput}
                    ref={ref}
                />
                <label htmlFor={`${name}_input`} className={cx('form__label')}>
                    {labelTitle}
                </label>
            </div>
            {displayErrorMessage && <span className={cx('form__error-message')}>{errorMessage}</span>}
        </>
    );
});

Input.propTypes = {
    labelTitle: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    validateFunc: PropTypes.func,
    wasSubmitted: PropTypes.bool,
};

export default React.memo(Input);
