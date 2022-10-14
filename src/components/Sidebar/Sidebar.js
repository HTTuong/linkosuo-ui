import classNames from 'classnames/bind';
import classes from './Sidebar.module.scss';
import React from 'react';
import { CloseIcon } from '~/components/Icon';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import config from '~/config';

const cx = classNames.bind(classes);

const generateTitle = (title) => {
    if (title.includes('-')) {
        return title.split('-').join(' ');
    }
    return title;
};

const generateDietTitle = (item) => {
    const capitalizeFirstChar = generateTitle(item).charAt(0).toUpperCase();
    const remainingChar = generateTitle(item).slice(1);
    return capitalizeFirstChar + remainingChar;
};

const Sidebar = React.forwardRef(({ menu, openDiet, deleteOverlay }, ref) => {
    const [active, setActive] = React.useState('');

    const navigate = useNavigate();
    const pathRoute = useLocation();

    const type = React.useMemo(() => pathRoute.pathname.split('/')[3], [pathRoute]);

    React.useLayoutEffect(() => {
        setActive('');
    }, [type]);

    React.useImperativeHandle(ref, () => ({
        reset: () => {
            setActive('');
        },
    }));

    const renderMenu = React.useCallback(() => {
        return menu.map((item) => (
            <li
                key={Math.random()}
                className={cx('menu-item', { active: active === item })}
                onClick={() => {
                    navigate(`${config.routes.collections.collections}/${type}/${item}`);
                    setActive(item);
                }}
            >
                {generateDietTitle(item)}
            </li>
        ));
    }, [active, menu, navigate, type]);

    return (
        <div className={cx('sidebar', { show: openDiet })}>
            <div className={cx('sidebar-heading')}>
                <h3 className={cx('title')}>Special diet</h3>
                <div className={cx('close-icon-wrapper')} onClick={deleteOverlay}>
                    <CloseIcon className={cx('close-icon')} width="1.8rem" />
                </div>
            </div>
            <ul className={cx('menu', { 'show-menu': openDiet })}>{renderMenu()}</ul>
        </div>
    );
});

Sidebar.propTypes = {
    menu: PropTypes.array,
};

export default Sidebar;
