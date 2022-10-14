import config from '.';

export const NAVBAR_ITEMS = [
    {
        title: 'Sweet',
        to: config.routes.collections.sweet,
        children: [
            {
                title: 'Cakes',
                to: config.routes.collections.cake,
            },
            {
                title: 'Pies',
                to: config.routes.collections.pies,
            },
            {
                title: 'Coffee cakes and buns',
                to: config.routes.collections.buns,
            },
        ],
    },
    {
        title: 'Salty',
        to: config.routes.collections.salty,
        children: [
            {
                title: 'Salads',
                to: config.routes.collections.salads,
            },
            {
                title: 'Sandwich cakes',
                to: config.routes.collections.sandwich,
            },
            {
                title: 'Round roasts',
                to: config.routes.collections.roast,
            },
            {
                title: 'Egg rolls',
                to: config.routes.collections.roll,
            },
        ],
    },
    {
        title: 'Sauces and spices',
        to: config.routes.collections.sauce,
    },
    {
        title: 'All products',
        to: config.routes.collections.allproduct,
    },
    {
        title: 'Contact information',
        to: config.routes.pages.contact,
    },
];
