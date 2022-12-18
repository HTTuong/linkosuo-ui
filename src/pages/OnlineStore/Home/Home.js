import classNames from 'classnames/bind';
import classes from './Home.module.scss';
import images from '~/assets/images';
import config from '~/config';
import Quotes from './components/Quotes';
import Slider from './components/Slider';
import ShowProducts from './components/ShowProducts';
import ProductSection from './components/ProductSection';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '~/components/Loading';
import axios from 'axios';
import { REACT_APP_API } from '~/constants.d';

const cx = classNames.bind(classes);
const bodyELement = document.querySelector('body');
const api = REACT_APP_API;

const QUOTES = config.quotes;

const PRODUCT_SECTION = {
    image: 'https://cdn.shopify.com/s/files/1/0544/2600/9779/files/Linkosuon_voileipakakut_1000x.jpg?v=1635159627',
    subTitle: 'Traditional and tasty',
    title: 'Sandwich cakes',
    content:
        'In addition to sweet cakes, our traditional sandwich cakes are a popular part of the party table. These classic products are all lactose free.',
    titleLink: 'See all sandwich cakes',
    link: config.routes.collections.sandwich,
};

function Home() {
    const navigate = useNavigate();

    const [productsList, setProductsList] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useLayoutEffect(() => {
        setIsLoading(true);

        const getProductsHomePage = async () => {
            try {
                const response = await axios.get(api);
                return response;
            } catch (error) {
                console.log(error);
            }
        };

        getProductsHomePage()
            .then((response) => {
                return response.data.products;
            })
            .then((products) => {
                setProductsList(products);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                if (error.message === 'Network Error') {
                    navigate('/linkosuo-ui/*', { replace: true }); // server down
                }
                if (error.response.status === 404) {
                    navigate('/linkosuo-ui/*', { replace: true }); // not found
                }
            });
    }, [navigate]);

    const changeSliderImageHandler = () => {
        if (bodyELement.clientWidth < 768) {
            return images.slider_mobile;
        } else {
            return images.slider;
        }
    };

    return (
        <div className={cx('wrapper', { loading: isLoading })}>
            {!isLoading && (
                <>
                    <Slider image={changeSliderImageHandler()} title="for summer parties" subTitle="Order catering" />
                    <ShowProducts options={['cakes', 'pies']} productsList={productsList} title="For sweet treats" />
                    <ProductSection
                        image={PRODUCT_SECTION.image}
                        subTitle={PRODUCT_SECTION.subTitle}
                        title={PRODUCT_SECTION.title}
                        content={PRODUCT_SECTION.content}
                        titleLink={PRODUCT_SECTION.titleLink}
                        to={PRODUCT_SECTION.link}
                    />
                    <ShowProducts
                        options={['salads', 'omelet-rolls']}
                        productsList={productsList}
                        title="Popular salty"
                    />
                    <Quotes quotes={QUOTES} />
                </>
            )}
            {isLoading && <Loading />}
        </div>
    );
}

export default React.memo(Home);
