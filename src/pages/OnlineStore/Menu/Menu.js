import classNames from 'classnames/bind';
import Sidebar from '~/components/Sidebar';
import classes from './Menu.module.scss';
import GridProducts from '~/components/GridProducts';
import Loading from '~/components/Loading';
import Button from '~/components/Button';
import Overlay from '~/layouts/StoreLayout/components/Overlay';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '~/config';
import { REACT_APP_API } from '~/constants.d';

const cx = classNames.bind(classes);
const bodyELement = document.querySelector('body');
const api = REACT_APP_API;

function Menu() {
    const navigate = useNavigate();
    const pathRoute = useLocation();
    const headingRef = React.useRef();

    const [menuList, setMenuList] = React.useState([]);
    const [menuDescription, setMenuDescription] = React.useState([]);
    const [productList, setProductList] = React.useState([]);
    const [menuTitle, setMenuTitle] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(true);
    const [colsNumber, setColsNumber] = React.useState(4);
    const [openDiet, setOpenDiet] = React.useState(false);

    const type = pathRoute.pathname.split('/')[3];
    const diet = pathRoute.pathname.split('/')[4] || '';

    React.useLayoutEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get(`${api}/collections/${type}/${diet}`);
            return response;
        };

        setIsLoading(true);

        fetchProducts()
            .then((response) => {
                setMenuList(response.data.menu);
                setProductList(response.data.products);
                setMenuTitle(response.data.title);
                if (response.data.description) {
                    setMenuDescription(response.data.description);
                } else {
                    setMenuDescription('');
                }
                setIsLoading(false);

                if (bodyELement.clientWidth <= 768) {
                    setColsNumber(2);
                } else if (bodyELement.clientWidth <= 1180) {
                    setColsNumber(3);
                } else {
                    setColsNumber(4);
                }
            })
            .catch((error) => {
                const errorObject = error.toJSON();
                console.log(error.toJSON());
                console.log(errorObject);
                if (errorObject.status === 404) {
                    navigate('/linkosuo-ui/*', { replace: true });
                } else if (errorObject.status === null) {
                    navigate('/linkosuo-ui/*', { replace: true });
                } else {
                    console.log(errorObject);
                }
            });
    }, [type, diet, navigate]);

    React.useEffect(() => {
        bodyELement.classList.remove('disable-scrollbar');
        setOpenDiet(false);
    }, [pathRoute.pathname]);

    React.useEffect(() => {
        const changeColumsNumber = window.addEventListener('resize', () => {
            if (bodyELement.clientWidth < 768) {
                setColsNumber(2);
            } else if (bodyELement.clientWidth <= 1180) {
                setColsNumber(3);
            } else {
                setColsNumber(4);
            }
        });

        return () => {
            bodyELement.removeEventListener('resize', changeColumsNumber);
        };
    }, []);

    const deleteOverlay = React.useCallback((event) => {
        event.stopPropagation();
        bodyELement.classList.remove('disable-scrollbar');
        setOpenDiet(false);
    }, []);

    const renderDescription = React.useCallback(() => {
        return menuDescription.map((description) => (
            <span key={Math.random()} className={cx('description__item')}>
                {description}
            </span>
        ));
    }, [menuDescription]);

    const navigateToTypeMenu = React.useCallback(() => {
        navigate(`${config.routes.collections.collections}/${type}`);
        headingRef.current.reset();
    }, [type, navigate]);

    return (
        <div className={cx('wrapper', { loading: isLoading })}>
            {!isLoading && (
                <>
                    <header className={cx('heading')} ref={headingRef} onClick={navigateToTypeMenu}>
                        <h2 className={cx('heading__title')}>{menuTitle}</h2>
                        {menuDescription && <div className={cx('description')}>{renderDescription()}</div>}
                    </header>
                    <div className={cx('menu-btn-section')}>
                        <span className={cx('menu-btn-section__title')}>{diet.split('-').join(' ')}</span>
                        <Button
                            className={cx('menu-btn-section__btn')}
                            title="Select special diet"
                            onClick={() => {
                                bodyELement.classList.add('disable-scrollbar');
                                setOpenDiet(true);
                            }}
                        />
                    </div>
                    <div className={cx('content')}>
                        <Sidebar menu={menuList} ref={headingRef} openDiet={openDiet} deleteOverlay={deleteOverlay} />

                        <div className={cx('product-list')}>
                            <GridProducts products={productList} wrap cols={colsNumber} className={cx('animation')} />
                        </div>
                    </div>
                </>
            )}
            {isLoading && <Loading />}
            <Overlay active={openDiet} zIndex="4" inactiveFunction={deleteOverlay} />
        </div>
    );
}

export default React.memo(Menu);
