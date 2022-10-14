import React from 'react';

const CartContext = React.createContext({
    totalAmountPrice: 0,
    totalAmount: 0,
    lastViewedProducts: [],
    order: {
        products: [],
        totalAmountPrice: 0,
        address: '',
        date: '',
    },
    productsInCart: [],
    handleAddProduct: (item) => {},
    handleRemoveProduct: (item) => {},
    handleDeleteProduct: (item) => {},
    handleClearProduct: () => {},
    handleModifyAddressOrder: (address) => {},
    handleModifyDateOrder: (date) => {},
    handleAddLastViewProduct: (item) => {},
});

export default CartContext;
