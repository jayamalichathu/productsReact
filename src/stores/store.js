import { configureStore } from '@reduxjs/toolkit'

import productReducer from "./productSlice";
import loginReducer from "./loginSlice";

export default configureStore({
    reducer: {
        products: productReducer,
        login: loginReducer
    },
})