import classNames from 'classnames/bind';
import classes from './Search.module.scss';
import { SearchIcon, CloseIcon } from '~/components/Icon';
import React from 'react';
import PropTypes from 'prop-types';

const cx = classNames.bind(classes);

function Search({ isSearching, isScrolling, deleteOverlay }) {
    const [searchValue, setSearchValue] = React.useState('');

    const handleChangeSearch = (event) => {
        const value = event.target.value;
        if (value.startsWith(' ')) {
            return;
        }
        setSearchValue(event.target.value);
    };

    return (
        <div className={cx('search', { 'search-showed': isSearching, 'search-scrolled': isScrolling })}>
            <div className={cx('search-icon')}>
                <SearchIcon width="2.1rem" height="2.1rem" />
            </div>

            <input
                className={cx('search-input')}
                type="text"
                name="search"
                value={searchValue}
                autoComplete="off"
                placeholder="Search ..."
                onChange={handleChangeSearch}
            />

            <div className={cx('close-icon')} onClick={deleteOverlay}>
                <CloseIcon width="1.8rem" height="1.8rem" />
            </div>
        </div>
    );
}

Search.propTypes = {
    isSearching: PropTypes.bool.isRequired,
    isScrolling: PropTypes.bool.isRequired,
    deleteOverlay: PropTypes.func.isRequired,
};

export default Search;
