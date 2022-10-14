import React, { useReducer } from 'react';
import CartContext from '~/store/context';

const initialState = {
    totalAmountPrice: 0,
    totalAmount: 0,
    lastViewedProducts: [],
    productsInCart: [],
    order: {
        products: [],
        totalAmountPrice: 0,
        address: '',
        date: '',
    },
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        let newOrder = state.order;
        const updateTotalAmountPrice = state.totalAmountPrice + action.item.price * action.item.amount;
        const updateTotalAmount = state.totalAmount + action.item.amount;

        const productIndexInStore = state.productsInCart.findIndex((item) => item._id === action.item._id);

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

        newOrder.products = updatedProductsInCart;
        newOrder.totalAmountPrice = updateTotalAmountPrice;

        return {
            totalAmountPrice: updateTotalAmountPrice,
            totalAmount: updateTotalAmount,
            lastViewedProducts: [...state.lastViewedProducts],
            productsInCart: updatedProductsInCart,
            order: newOrder,
        };
    }
    if (action.type === 'REMOVE') {
        let newOrder = state.order;
        const updateTotalAmountPrice = state.totalAmountPrice - action.item.price * action.item.amount;
        const updateTotalAmount = state.totalAmount - action.item.amount;

        const productIndexInStore = state.productsInCart.findIndex((item) => item._id === action.item._id);
        const productInCart = state.productsInCart[productIndexInStore];
        let updatedProductsInCart;

        if (productInCart.amount === 1) {
            updatedProductsInCart = [...state.productsInCart];
            updatedProductsInCart.splice(productIndexInStore, 1);

            newOrder = {
                products: [],
                totalAmountPrice: 0,
                address: '',
                date: '',
            };
        } else {
            const updatedProduct = {
                ...productInCart,
                total: productInCart.total - action.item.price * action.item.amount,
                amount: productInCart.amount - action.item.amount,
            };
            updatedProductsInCart = [...state.productsInCart];
            updatedProductsInCart[productIndexInStore] = updatedProduct;

            newOrder.products = updatedProductsInCart;
            newOrder.totalAmountPrice = updateTotalAmountPrice;
        }

        return {
            totalAmountPrice: updateTotalAmountPrice,
            totalAmount: updateTotalAmount,
            lastViewedProducts: [...state.lastViewedProducts],
            productsInCart: updatedProductsInCart,
            order: newOrder,
        };
    }
    if (action.type === 'DELETE') {
        let currentOrder = state.order;
        const updateTotalAmountPrice = state.totalAmountPrice - action.item.price * action.item.amount;
        const updateTotalAmount = state.totalAmount - action.item.amount;

        const productInStore = [...state.productsInCart];
        let updatedProductsInCart = productInStore.filter((item) => item._id.toString() !== action.item._id.toString());

        currentOrder.products = updatedProductsInCart;
        currentOrder.totalAmountPrice = updateTotalAmountPrice;

        if (updatedProductsInCart.length === 0) {
            currentOrder = {
                products: [],
                totalAmountPrice: 0,
                address: '',
                date: '',
            };
        }

        return {
            totalAmountPrice: updateTotalAmountPrice,
            totalAmount: updateTotalAmount,
            lastViewedProducts: [...state.lastViewedProducts],
            productsInCart: updatedProductsInCart,
            order: currentOrder,
        };
    }
    if (action.type === 'MODIFY_ADDRESS') {
        let currentOrder = state.order;
        currentOrder.address = action.address;

        const updatedProductsInCart = state.productsInCart;
        const updateTotalAmount = state.totalAmount;
        const updateTotalAmountPrice = state.totalAmountPrice;

        return {
            totalAmountPrice: updateTotalAmountPrice,
            totalAmount: updateTotalAmount,
            lastViewedProducts: [...state.lastViewedProducts],
            productsInCart: updatedProductsInCart,
            order: currentOrder,
        };
    }
    if (action.type === 'MODIFY_DATE') {
        let currentOrder = state.order;
        currentOrder.date = action.date;

        const updatedProductsInCart = state.productsInCart;
        const updateTotalAmount = state.totalAmount;
        const updateTotalAmountPrice = state.totalAmountPrice;

        return {
            totalAmountPrice: updateTotalAmountPrice,
            totalAmount: updateTotalAmount,
            lastViewedProducts: [...state.lastViewedProducts],
            productsInCart: updatedProductsInCart,
            order: currentOrder,
        };
    }
    if (action.type === 'LAST_VIEW') {
        const originallastViewedProducts = [...state.lastViewedProducts];
        let newlastViewedProducts = originallastViewedProducts.concat(action.item);

        return {
            totalAmountPrice: state.totalAmountPrice,
            totalAmount: state.totalAmount,
            lastViewedProducts: newlastViewedProducts,
            productsInCart: state.productsInCart,
            order: state.order,
        };
    }
    if (action.type === 'CLEAR') {
        return {
            totalAmountPrice: 0,
            totalAmount: 0,
            productsInCart: [],
            lastViewedProducts: [...state.lastViewedProducts],
            order: {
                products: [],
                totalAmountPrice: 0,
                address: '',
                date: '',
            },
        };
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

    const modifyAddress = (address) => {
        dispatch({ type: 'MODIFY_ADDRESS', address: address });
    };

    const modifyDate = (date) => {
        dispatch({ type: 'MODIFY_DATE', date: date });
    };

    const addLastViewProduct = (item) => {
        dispatch({ type: 'LAST_VIEW', item: item });
    };

    const contextContent = {
        totalAmountPrice: cartState.totalAmountPrice,
        totalAmount: cartState.totalAmount,
        order: cartState.order,
        lastViewedProducts: cartState.lastViewedProducts,
        productsInCart: cartState.productsInCart,
        handleAddProduct: addProductToCart,
        handleRemoveProduct: removeProductFromCart,
        handleDeleteProduct: deleteProductFromCart,
        handleClearProduct: clearProductInCart,
        handleModifyAddressOrder: modifyAddress,
        handleModifyDateOrder: modifyDate,
        handleAddLastViewProduct: addLastViewProduct,
    };

    return <CartContext.Provider value={contextContent}>{children}</CartContext.Provider>;
}

export default ContextProvider;
