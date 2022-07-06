import config from '.';

export const NAVBAR_ITEMS = [
    {
        title: 'Sweet',
        to: config.routes.store.sweet,
        children: [
            {
                title: 'Cakes',
                to: config.routes.store.cake,
            },
            {
                title: 'Pies',
                to: config.routes.store.pie,
            },
            {
                title: 'Coffee cakes and buns',
                to: config.routes.store.buns,
            },
        ],
    },
    {
        title: 'Salty',
        to: config.routes.store.salty,
        children: [
            {
                title: 'Salads',
                to: config.routes.store.salad,
            },
            {
                title: 'Sandwich cakes',
                to: config.routes.store.sandwich,
            },
            {
                title: 'Round roasts',
                to: config.routes.store.roast,
            },
            {
                title: 'Egg rolls',
                to: config.routes.store.roll,
            },
        ],
    },
    {
        title: 'Sauces and spices',
        to: config.routes.store.sauce,
    },
    {
        title: 'All products',
        to: config.routes.store.allproduct,
    },
    {
        title: 'Contact information',
        to: config.routes.store.contact,
    },
];
