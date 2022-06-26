import { useSelector as useReduxSelector, TypedUseSelectorHook } from "react-redux";
import  { RootState } from "./store";

// 为旧的useSelector加上新的类型定义
export const useSelector:TypedUseSelectorHook<RootState> = useReduxSelector;