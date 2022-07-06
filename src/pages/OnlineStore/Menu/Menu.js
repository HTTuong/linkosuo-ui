import classNames from 'classnames/bind';
import Sidebar from '~/components/Sidebar';
import classes from './Menu.module.scss';
import GridProducts from '~/components/GridProducts';
import { useState, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const cx = classNames.bind(classes);

function Menu({ data }) {
    const headingRef = useRef();
    const pathRoute = useLocation();
    const { types, description, menu, products } = data;

    const [menuList, setMenuList] = useState([]);
    const [menuDescription, setMenuDescription] = useState('');
    const [productList, setProductList] = useState(products);
    const [sortedProductList, setSortedProductList] = useState([]);

    const urlPathName = pathRoute.pathname.split('/')[1];

    useLayoutEffect(() => {
        for (let type of types) {
            if (urlPathName.includes(type)) {
                let newProductList = [];
                let newMenuList = [];
                if (type === types[0]) {
                    newProductList = products;
                    newMenuList = menu[types[0]];
                } else {
                    newProductList = products.filter((item) => item.type === type);
                    newMenuList = menu[type];
                }
                setProductList(newProductList);
                setMenuList(newMenuList);
                setMenuDescription(description[type]);
                setSortedProductList([]);
            }
        }
    }, [urlPathName, products, description, types, menu]);

    const handleChangeList = () => {
        if (sortedProductList.length > 0) {
            return sortedProductList;
        } else {
            return productList;
        }
    };

    const menuTitle = urlPathName.split('-').join(' ');

    return (
        <div className={cx('wrapper')}>
            <header
                className={cx('heading')}
                ref={headingRef}
                onClick={() => {
                    setSortedProductList(productList);
                    headingRef.current.reset();
                }}
            >
                <h2 className={cx('heading__title')}>{menuTitle}</h2>
                {menuDescription && (
                    <div className={cx('description')}>
                        {menuDescription.map((item, index) => (
                            <span key={index} className={cx('description__item')}>
                                {item.content}
                            </span>
                        ))}
                    </div>
                )}
            </header>
            <div className={cx('content')}>
                <Sidebar menu={menuList} products={productList} getProducts={setSortedProductList} ref={headingRef} />
                <div className={cx('product-list')}>
                    <GridProducts products={handleChangeList()} wrap className={cx('animation')} />
                </div>
            </div>
        </div>
    );
}

Menu.propTypes = {
    data: PropTypes.object,
};

export default Menu;
