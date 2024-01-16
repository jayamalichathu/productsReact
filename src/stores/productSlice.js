import { createSlice } from '@reduxjs/toolkit';

export function getInitialProducts() {
    return [
        {   description: "Ans",
            canBeExpired : true,
            expiredDate: "2024-10-10",
            name: "Product 1",
            category: "vegetable",
            isSpecial: true,
            price: "£200",
        },
        {   description: "Anss",
            canBeExpired : true,
            expiredDate: "2024-10-10",
            name: "Product 2",
            category: "vegetable",
            isSpecial: false,
            price: "£200",
        },
        {   description: "Andfs",
            canBeExpired : false,
            expiredDate: "2024-10-10",
            name: "Product 23",
            category: "furniture",
            isSpecial: false,
            price: "£200",
        },
        {   description: "Anxvcvs",
            canBeExpired : true,
            expiredDate: "2024-10-10",
            name: "Product 3",
            category: "meat",
            isSpecial: true,
            price: "£200",
        },
        {   description: "Anbnbns",
            canBeExpired : true,
            expiredDate: "2024-10-10",
            name: "Product 4",
            category: "vegetable",
            isSpecial: true,
            price: "£200",
        },
        {   description: "Ankukks",
            canBeExpired : true,
            expiredDate: "2024-10-10",
            name: "Product 5",
            category: "meat",
            isSpecial: false,
            price: "£200"
        }
    ]
}

export const productSlice = createSlice({
    name: 'products',
    initialState: {
        allProductList: getInitialProducts()
    },
    reducers: {
        addProduct: (state, {payload}) => {
            state.allProductList = state.allProductList.concat(payload);
        },
        editProduct: (state, {payload}) => {
            state.allProductList = state.allProductList.map(product =>
                product.name === payload.name ? { ...payload } : product
            );
        },
        deleteProduct: (state, {payload}) => {
            state.allProductList = state.allProductList.filter(product => product.name !== payload.name);
        }

    },
})

// Action creators are generated for each case reducer function
export const { addProduct, editProduct, deleteProduct} = productSlice.actions

export default productSlice.reducer