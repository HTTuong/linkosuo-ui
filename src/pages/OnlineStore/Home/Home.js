import classNames from 'classnames/bind';
import classes from './Home.module.scss';
import images from '~/assets/images';
import config from '~/config';
import Quotes from './components/Quotes';
import Slider from './components/Slider';
import ShowProducts from './components/ShowProducts';
import ProductSection from './components/ProductSection';

const cx = classNames.bind(classes);

const SWEET_OPTIONS = config.products.SWEET_OPTIONS;
const SALTY_OPTIONS = config.products.SALTY_OPTIONS;
const CAKES = config.products.SWEETS_DATA.products.filter((item) => item.type === 'cake').slice(0, 4);
const PIES = config.products.SWEETS_DATA.products.filter((item) => item.type === 'pie').slice(0, 4);
const SALADS = config.products.SALTY_DATA.products.filter((item) => item.type === 'salad').slice(0, 4);
const EGG_ROLLS = config.products.SALTY_DATA.products.filter((item) => item.type === 'roll').slice(0, 4);
const QUOTES = config.quotes;

const PRODUCT_SECTION = {
    image: 'https://cdn.shopify.com/s/files/1/0544/2600/9779/files/Linkosuon_voileipakakut_1000x.jpg?v=1635159627',
    subTitle: 'Traditional and tasty',
    title: 'Sandwich cakes',
    content:
        'In addition to sweet cakes, our traditional sandwich cakes are a popular part of the party table. These classic products are all lactose free.',
    titleLink: 'See all sandwich cakes',
    link: config.routes.store.sandwich,
};

function Home() {
    return (
        <div className={cx('wrapper')}>
            <Slider image={images.slider} title="for summer parties" subTitle="Order catering" />
            <ShowProducts
                options={SWEET_OPTIONS}
                productsList1={CAKES}
                productsList2={PIES}
                title="For sweet treats"
                buttonLink={config.routes.store.home}
            />
            <ProductSection
                image={PRODUCT_SECTION.image}
                subTitle={PRODUCT_SECTION.subTitle}
                title={PRODUCT_SECTION.title}
                content={PRODUCT_SECTION.content}
                titleLink={PRODUCT_SECTION.titleLink}
                to={PRODUCT_SECTION.link}
            />
            <ShowProducts
                options={SALTY_OPTIONS}
                productsList1={SALADS}
                productsList2={EGG_ROLLS}
                title="Popular salty"
                buttonLink={config.routes.store.home}
            />
            <Quotes quotes={QUOTES} />
        </div>
    );
}

export default Home;
