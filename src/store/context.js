import React from 'react';

const CartContext = React.createContext({
    totalAmountPrice: 0,
    totalAmount: 0,
    lastViewedProducts: [],
    productsInCart: [],
    handleAddProduct: (item) => {},
    handleRemoveProduct: (item) => {},
    handleDeleteProduct: (item) => {},
    handleClearProduct: () => {},
});

export default CartContext;
