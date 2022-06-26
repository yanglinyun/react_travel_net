import { ThunkAction}  from "redux-thunk"
import { RootState } from "../store";
import axios from 'axios';

export const FETCH_RECOMMEND_PRODUCTS_START = 
    "FETCH_RECOMMEND_PRODUCTS_START";// 正在调用推荐信息api
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS = 
    "FETCH_RECOMMEND_PRODUCTS_SUCCESS";// 推荐信息api调用成功
export const FETCH_RECOMMEND_PRODUCTS_FAIL = 
    "FETCH_RECOMMEND_PRODUCTS_FAIL";// 推荐信息api调用失败

interface FetchRecommendProductStartAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_START,
}

interface FetchRecommendProductSucessAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload: any, // 返回数据
}

interface FetchRecommendProductFailAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL,
    payload: any, // 返回数据
}

export type RecommendProductAction = 
 FetchRecommendProductFailAction |
 FetchRecommendProductStartAction |
 FetchRecommendProductSucessAction

// action创建函数工厂
export const fetchRecommendProductStartAction = ():FetchRecommendProductStartAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_START
    }
}

export const fetchRecommendProductFailAction = (error):FetchRecommendProductFailAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_FAIL,
        payload: error
    }
}

export const fetchRecommendProductSucessAction = (data):FetchRecommendProductSucessAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
        payload: data
    }
}

export const giveMeDataActionCreator = ():ThunkAction<void,RootState,unknown,RecommendProductAction>  => 
    async   (dispatch, getState) => {
    dispatch(fetchRecommendProductStartAction());
      try{
        const { data } = await axios.get("/api/Productlistb"/*"http://192.168.0.1:8080/api/productCollections"*/) 
        dispatch(fetchRecommendProductSucessAction(data));
      }catch(e:any){
        dispatch(fetchRecommendProductFailAction(e.message));
      }
}