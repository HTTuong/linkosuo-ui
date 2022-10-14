import classNames from 'classnames/bind';
import classes from './Quotes.module.scss';
import React from 'react';
import PropTypes from 'prop-types';

const cx = classNames.bind(classes);

function Quotes({ quotes }) {
    const [selectedNumber, setSelectedNumber] = React.useState(0);

    React.useEffect(() => {
        const loopQuote = setTimeout(() => {
            const newNumber = (selectedNumber + 1) % quotes.length;
            setSelectedNumber(newNumber);
        }, 5000);

        return () => {
            clearTimeout(loopQuote);
        };
    }, [selectedNumber, quotes]);

    return (
        <div className={cx('quotes')}>
            <div className={cx('quotes-list')}>
                {quotes.map((item, index) => (
                    <div key={index} className={cx('quote', { active: selectedNumber === index })}>
                        {item.title}
                    </div>
                ))}
            </div>
            <div className={cx('dots-list')}>
                {[...Array(quotes.length).keys()].map((_, index) => (
                    <div
                        key={index}
                        className={cx('dot', { active: selectedNumber === index })}
                        onClick={() => setSelectedNumber(index)}
                    ></div>
                ))}
            </div>
        </div>
    );
}

Quotes.propTypes = {
    quotes: PropTypes.array.isRequired,
};

export default Quotes;
