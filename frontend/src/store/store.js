import { configureStore } from '@reduxjs/toolkit';
import storeReducer from "./storeReducer"

const store = configureStore({
    reducer: {
        store: storeReducer
    },
});

export default store;