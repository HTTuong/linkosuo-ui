import React, { useReducer } from 'react';
import CartContext from '~/store/context';

const initialState = {
    totalAmountPrice: 0,
    totalAmount: 0,
    // lastViewedProducts: [],
    productsInCart: [],
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updateTotalAmountPrice = state.totalAmountPrice + action.item.price * action.item.amount;
        const updateTotalAmount = state.totalAmount + action.item.amount;

        const productIndexInStore = state.productsInCart.findIndex((item) => item.id === action.item.id);

        const productInCart = state.productsInCart[productIndexInStore];

        let updatedProductsInCart;

        if (productInCart) {
            const updatedProduct = {
                ...productInCart,
                total: productInCart.total + action.item.price * action.item.amount,
                amount: productInCart.amount + action.item.amount,
            };

            updatedProductsInCart = [...state.productsInCart];
            updatedProductsInCart[productIndexInStore] = updatedProduct;
        } else {
            const updatedProduct = {
                ...action.item,
                total: action.item.price * action.item.amount,
            };
            updatedProductsInCart = state.productsInCart.concat(updatedProduct);
        }

        return {
            totalAmountPrice: updateTotalAmountPrice,
            totalAmount: updateTotalAmount,
            productsInCart: updatedProductsInCart,
        };
    }
    if (action.type === 'REMOVE') {
        const updateTotalAmountPrice = state.totalAmountPrice - action.item.price * action.item.amount;
        const updateTotalAmount = state.totalAmount - action.item.amount;

        const productIndexInStore = state.productsInCart.findIndex((item) => item.id === action.item.id);
        const productInCart = state.productsInCart[productIndexInStore];
        let updatedProductsInCart;

        if (productInCart.amount === 1) {
            updatedProductsInCart = [...state.productsInCart];
            updatedProductsInCart.splice(productIndexInStore, 1);
        } else {
            const updatedProduct = {
                ...productInCart,
                total: productInCart.total - action.item.price * action.item.amount,
                amount: productInCart.amount - action.item.amount,
            };
            updatedProductsInCart = [...state.productsInCart];
            updatedProductsInCart[productIndexInStore] = updatedProduct;
        }
        return {
            totalAmountPrice: updateTotalAmountPrice,
            totalAmount: updateTotalAmount,
            productsInCart: updatedProductsInCart,
        };
    }
    if (action.type === 'DELETE') {
        const updateTotalAmountPrice = state.totalAmountPrice - action.item.price * action.item.amount;
        const updateTotalAmount = state.totalAmount - action.item.amount;

        const productInStore = [...state.productsInCart];
        let updatedProductsInCart = productInStore.filter((item) => item.id !== action.item.id);

        return {
            totalAmountPrice: updateTotalAmountPrice,
            totalAmount: updateTotalAmount,
            productsInCart: updatedProductsInCart,
        };
    }
    if (action.type === 'CLEAR') {
        return initialState;
    }
};

function ContextProvider({ children }) {
    const [cartState, dispatch] = useReducer(cartReducer, initialState);

    const addProductToCart = (item) => {
        dispatch({ type: 'ADD', item: item });
    };

    const removeProductFromCart = (item) => {
        dispatch({ type: 'REMOVE', item: item });
    };

    const deleteProductFromCart = (item) => {
        dispatch({ type: 'DELETE', item: item });
    };

    const clearProductInCart = () => {
        dispatch({ type: 'CLEAR' });
    };

    const contextContent = {
        totalAmountPrice: cartState.totalAmountPrice,
        totalAmount: cartState.totalAmount,
        // lastViewedProducts: cartState.lastViewedProducts,
        productsInCart: cartState.productsInCart,
        handleAddProduct: addProductToCart,
        handleRemoveProduct: removeProductFromCart,
        handleDeleteProduct: deleteProductFromCart,
        handleClearProduct: clearProductInCart,
    };

    return <CartContext.Provider value={contextContent}>{children}</CartContext.Provider>;
}

export default ContextProvider;
