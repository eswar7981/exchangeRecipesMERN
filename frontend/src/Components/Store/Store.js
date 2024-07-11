import { configureStore } from "@reduxjs/toolkit";

import authReducer from './AuthStore'
import appReducer from './AppStore'

const store=configureStore({
    reducer:{auth:authReducer,app:appReducer}
    
})

export default store