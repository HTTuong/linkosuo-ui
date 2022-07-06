// Routes (config)
import routes from '~/config/routes';

// Data
import { SWEETS_DATA, SALTY_DATA, SAUCE_DATA, ALL_PRODUCTS_DATA, SPRING_AND_SUMMER_DATA } from '~/config/assembleStore';

// Lauouts
import { MenuLayout, OnlyHeaderStoreLayout } from '~/layouts/StoreLayout';

// Pages
import { Home, Account, Cart, Contact, Policy, Menu, Detail, NoFound, Payment } from '~/pages/OnlineStore';

const publicRoutes = [
    { path: routes.store.home, component: Home, layout: OnlyHeaderStoreLayout },

    { path: routes.store.sweet, component: Menu, data: SWEETS_DATA, layout: MenuLayout },
    { path: routes.store.cake, component: Menu, data: SWEETS_DATA, layout: MenuLayout },
    { path: routes.store.pie, component: Menu, data: SWEETS_DATA, layout: MenuLayout },
    { path: routes.store.buns, component: Menu, data: SWEETS_DATA, layout: MenuLayout },

    { path: routes.store.salty, component: Menu, data: SALTY_DATA, layout: MenuLayout },
    { path: routes.store.salad, component: Menu, data: SALTY_DATA, layout: MenuLayout },
    { path: routes.store.sandwich, component: Menu, data: SALTY_DATA, layout: MenuLayout },
    { path: routes.store.roast, component: Menu, data: SALTY_DATA, layout: MenuLayout },
    { path: routes.store.roll, component: Menu, data: SALTY_DATA, layout: MenuLayout },

    { path: routes.store.sauce, component: Menu, data: SAUCE_DATA, layout: MenuLayout },

    { path: routes.store.allproduct, component: Menu, data: ALL_PRODUCTS_DATA, layout: MenuLayout },

    { path: routes.store.spring, component: Menu, data: SPRING_AND_SUMMER_DATA, layout: MenuLayout },

    { path: routes.store.detail, component: Detail, data: ALL_PRODUCTS_DATA, layout: MenuLayout },

    { path: routes.store.contact, component: Contact, layout: OnlyHeaderStoreLayout },
    { path: routes.store.account, component: Account, layout: OnlyHeaderStoreLayout },
    { path: routes.store.cart, component: Cart, layout: OnlyHeaderStoreLayout },
    { path: routes.store.policy, component: Policy, layout: OnlyHeaderStoreLayout },

    { path: routes.store.nofound, component: NoFound, layout: OnlyHeaderStoreLayout },
    { path: routes.store.payment, component: Payment, layout: OnlyHeaderStoreLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
