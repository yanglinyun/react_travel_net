import { createStore, combineReducers } from 'redux';
import languageReducer from './language/languageReducer';
import recommendProductsReducers from "./recommendProducts/recommendProductsReducers"

const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducers
});
const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>

export default store;