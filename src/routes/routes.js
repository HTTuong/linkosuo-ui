// Routes (config)
import routes from '~/config/routes';

// Lauouts
import { DefaultLayout } from '~/layouts/StoreLayout';

// Pages
import {
    Home,
    Authentication,
    Profile,
    Cart,
    Contact,
    Policy,
    Menu,
    Detail,
    NoFound,
    Payment,
    Checkout,
} from '~/pages/OnlineStore';

const publicRoutes = [
    // Store routes
    { path: routes.store.home, component: Home, layout: DefaultLayout },
    { path: routes.store.payment, component: Payment, layout: DefaultLayout },
    { path: routes.store.cart, component: Cart, layout: DefaultLayout },
    { path: routes.store.checkout, component: Checkout, layout: null },

    // Collections routes
    { path: routes.collections.sweet, component: Menu, layout: DefaultLayout },
    { path: routes.collections.sweet + routes.diet, component: Menu, layout: DefaultLayout },
    { path: routes.collections.sweet + routes.products.productId, component: Detail, layout: DefaultLayout },

    { path: routes.collections.cake, component: Menu, layout: DefaultLayout },
    { path: routes.collections.cake + routes.diet, component: Menu, layout: DefaultLayout },
    { path: routes.collections.cake + routes.products.productId, component: Detail, layout: DefaultLayout },

    { path: routes.collections.pies, component: Menu, layout: DefaultLayout },
    { path: routes.collections.pies + routes.diet, component: Menu, layout: DefaultLayout },
    { path: routes.collections.pies + routes.products.productId, component: Detail, layout: DefaultLayout },

    { path: routes.collections.buns, component: Menu, layout: DefaultLayout },
    { path: routes.collections.buns + routes.diet, component: Menu, layout: DefaultLayout },
    { path: routes.collections.buns + routes.products.productId, component: Detail, layout: DefaultLayout },

    { path: routes.collections.salty, component: Menu, layout: DefaultLayout },
    { path: routes.collections.salty + routes.diet, component: Menu, layout: DefaultLayout },
    { path: routes.collections.salty + routes.products.productId, component: Detail, layout: DefaultLayout },

    { path: routes.collections.salads, component: Menu, layout: DefaultLayout },
    { path: routes.collections.salads + routes.diet, component: Menu, layout: DefaultLayout },
    { path: routes.collections.salads + routes.products.productId, component: Detail, layout: DefaultLayout },

    { path: routes.collections.sandwich, component: Menu, layout: DefaultLayout },
    { path: routes.collections.sandwich + routes.diet, component: Menu, layout: DefaultLayout },
    { path: routes.collections.sandwich + routes.products.productId, component: Detail, layout: DefaultLayout },

    { path: routes.collections.roast, component: Menu, layout: DefaultLayout },
    { path: routes.collections.roast + routes.diet, component: Menu, layout: DefaultLayout },
    { path: routes.collections.roast + routes.products.productId, component: Detail, layout: DefaultLayout },

    { path: routes.collections.roll, component: Menu, layout: DefaultLayout },
    { path: routes.collections.roll + routes.diet, component: Menu, layout: DefaultLayout },
    { path: routes.collections.roll + routes.products.productId, component: Detail, layout: DefaultLayout },

    { path: routes.collections.sauce, component: Menu, layout: DefaultLayout },
    { path: routes.collections.sauce + routes.diet, component: Menu, layout: DefaultLayout },
    { path: routes.collections.sauce + routes.products.productId, component: Detail, layout: DefaultLayout },

    { path: routes.collections.allproduct, component: Menu, layout: DefaultLayout },
    { path: routes.collections.allproduct + routes.diet, component: Menu, layout: DefaultLayout },
    { path: routes.collections.allproduct + routes.products.productId, component: Detail, layout: DefaultLayout },

    { path: routes.collections.event, component: Menu, layout: DefaultLayout },
    { path: routes.collections.event + routes.diet, component: Menu, layout: DefaultLayout },
    { path: routes.collections.event + routes.products.productId, component: Detail, layout: DefaultLayout },

    // Pages route
    { path: routes.pages.contact, component: Contact, layout: DefaultLayout },

    // Policies routes
    { path: routes.policies.shipping, component: Policy, layout: DefaultLayout },

    // Other routes
    { path: routes.others.nofound, component: NoFound, layout: DefaultLayout },
];

const privateRoutes = [{ path: routes.account.profile, component: Profile, layout: DefaultLayout }];

const authRoutes = [
    { path: routes.account.login, component: Authentication, layout: DefaultLayout },
    { path: routes.account.register, component: Authentication, layout: DefaultLayout },
    { path: routes.account.forgot, component: Authentication, layout: DefaultLayout },
    { path: routes.account.changepwd_user, component: Authentication, layout: DefaultLayout },
];

export { publicRoutes, privateRoutes, authRoutes };
