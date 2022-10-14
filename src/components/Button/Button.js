import React from 'react';
import classNames from 'classnames/bind';
import classes from './Button.module.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const cx = classNames.bind(classes);

function Button({ title, to, href, onClick, disabled, className, ...passProps }) {
    let Comp = 'button';

    const props = {
        onClick,
        ...passProps,
    };

    // Remove event listener of disabled button
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classComp = cx('wrapper', { [className]: className });

    return (
        <Comp className={classComp} {...props}>
            {title}
        </Comp>
    );
}

Button.propTypes = {
    title: PropTypes.string,
    to: PropTypes.string,
    href: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    passProps: PropTypes.array,
};

export default React.memo(Button);
