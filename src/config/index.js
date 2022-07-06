import routes from './routes';
import * as products from './assembleStore';
import QUOTES from './quotes';

const config = {
    routes,
    products,
    quotes: QUOTES,
};

export default config;
