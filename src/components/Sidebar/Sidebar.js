import classNames from 'classnames/bind';
import classes from './Sidebar.module.scss';
import React, { useState, useEffect, useImperativeHandle } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const cx = classNames.bind(classes);

const Sidebar = React.forwardRef(({ menu, products, getProducts }, ref) => {
    const [active, setActive] = useState(false);

    const pathRoute = useLocation();

    const handleSortingDiet = (diet) => {
        const sortedList = products.filter((item) => item.diet.includes(diet));
        return sortedList;
    };

    useEffect(() => {
        setActive(false);
    }, [pathRoute]);

    useImperativeHandle(ref, () => ({
        reset: () => {
            setActive(false);
        },
    }));

    return (
        <div className={cx('sidebar')}>
            <h3 className={cx('title')}>Special diet</h3>
            <ul className={cx('menu')}>
                {menu.map((item, index) => (
                    <li
                        key={index}
                        className={cx('menu-item', { active: active === item.diet })}
                        onClick={() => {
                            const newProductList = handleSortingDiet(item.diet);
                            getProducts(newProductList);
                            setActive(item.diet);
                        }}
                    >
                        {item.title}
                    </li>
                ))}
            </ul>
        </div>
    );
});

Sidebar.propTypes = {
    menu: PropTypes.array,
    products: PropTypes.array,
    getProducts: PropTypes.func,
};

export default Sidebar;
