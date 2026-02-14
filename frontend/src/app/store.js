import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../feature/searchSlice"

import { authApi } from "../feature/auth/authApi"
import {userApi} from "../feature/user/userApi"
import { collectionApi } from "../feature/collection/collectionApi";
import { savedItemApi } from "../feature/saved-items/savedItemApi";
import authReducer from "../feature/auth/authSlice";

export const store = configureStore({
    reducer:{
        search: searchReducer,
      
        [authApi.reducerPath]: authApi.reducer,
        [collectionApi.reducerPath]: collectionApi.reducer,
        [savedItemApi.reducerPath]: savedItemApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, collectionApi.middleware, savedItemApi.middleware, userApi.middleware),
})

export const resetAllApiStates = () => {
    store.dispatch(authApi.util.resetApiState())
    store.dispatch(collectionApi.util.resetApiState())
    store.dispatch(savedItemApi.util.resetApiState())
    store.dispatch(userApi.util.resetApiState())
}