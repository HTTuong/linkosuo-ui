const routes = {
    store: {
        home: '/linkosuo-ui',
        cart: '/linkosuo-ui/cart',
        payment: '/linkosuo-ui/payment',
        checkout: '/linkosuo-ui/checkout',
    },
    collections: {
        collections: '/linkosuo-ui/collections',

        sweet: '/linkosuo-ui/collections/sweet',
        cake: '/linkosuo-ui/collections/cakes',
        pies: '/linkosuo-ui/collections/pies',
        buns: '/linkosuo-ui/collections/coffee-cakes-and-buns',
        salty: '/linkosuo-ui/collections/salty',
        salads: '/linkosuo-ui/collections/salads',
        sandwich: '/linkosuo-ui/collections/sandwich-cakes',
        roast: '/linkosuo-ui/collections/round-roasts',
        roll: '/linkosuo-ui/collections/omelet-rolls',
        sauce: '/linkosuo-ui/collections/sauces-and-spices',
        allproduct: '/linkosuo-ui/collections/all-products',
        event: '/linkosuo-ui/collections/event',
    },
    diet: '/:diet',
    products: {
        productId: '/products/:productId',
    },
    pages: {
        contact: '/linkosuo-ui/pages/contact-information',
    },
    account: {
        login: '/linkosuo-ui/account/login',
        register: '/linkosuo-ui/account/register',
        forgot: '/linkosuo-ui/account/forgot-password',
        profile: '/linkosuo-ui/account/profile',
        changepwd: '/linkosuo-ui/account/change-password',
        changepwd_user: '/linkosuo-ui/account/change-password/:userId',
    },
    policies: {
        shipping: '/linkosuo-ui/policies/shipping-policy',
    },
    others: {
        nofound: '/linkosuo-ui/*',
    },
};

export default routes;
