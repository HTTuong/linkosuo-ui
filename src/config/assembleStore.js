import { SWEETS, SALTY, SAUCES_AND_SPICES, SPRING_AND_SUMMER } from './products/products';
import {
    SWEETS_DESCRIPTIONS,
    SALTY_DESCRIPTIONS,
    ALL_PRODUCTS_DESCRIPTIONS,
    SPRING__AND__SUMMER_DESCRIPTIONS,
} from './products/descriptions';
import { SWEETS_MENU, SALTY_MENU, SAUCE_MENU, ALL_PRODUCTS_MENU, SPRING_AND_SUMMER_MENU } from './products/menus';

export const SWEETS_DATA = {
    types: ['sweet', 'cake', 'pie', 'buns'],
    description: SWEETS_DESCRIPTIONS,
    menu: SWEETS_MENU,
    products: SWEETS,
};

export const SALTY_DATA = {
    types: ['salty', 'salad', 'sandwich', 'roast', 'roll'],
    description: SALTY_DESCRIPTIONS,
    menu: SALTY_MENU,
    products: SALTY,
};

export const SAUCE_DATA = {
    types: ['sauce'],
    description: [],
    menu: SAUCE_MENU,
    products: SAUCES_AND_SPICES,
};

export const ALL_PRODUCTS_DATA = {
    types: ['product'],
    description: ALL_PRODUCTS_DESCRIPTIONS,
    menu: ALL_PRODUCTS_MENU,
    products: [...SWEETS, ...SALTY, ...SAUCES_AND_SPICES],
};

export const SPRING_AND_SUMMER_DATA = {
    types: ['spring'],
    description: SPRING__AND__SUMMER_DESCRIPTIONS,
    menu: SPRING_AND_SUMMER_MENU,
    products: SPRING_AND_SUMMER,
};

export const SWEET_OPTIONS = [{ title: 'Cakes' }, { title: 'Pies' }];
export const SALTY_OPTIONS = [{ title: 'Salads' }, { title: 'Omelet rolls' }];
