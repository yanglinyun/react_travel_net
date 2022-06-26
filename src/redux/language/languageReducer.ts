import i18n from "i18next"; 
import { CHANGE_LANGUAGE, ADD_LANGUAGE, LanguageActionTypes} from "./languageActions";
// 定义数据结构
export interface LanguageState {
    language: "en" | "zh",
    languageList: {name: string, code: string}[]
}
// 初始化数据
const defaultState:LanguageState = {
    language: "zh",
    languageList: [
        {name: "中文", code: "zh"},
        {name: "English", code: "en"},
    ],
}

export default (state = defaultState, action:LanguageActionTypes)=>{
    switch(action.type){
        case CHANGE_LANGUAGE:
            i18n.changeLanguage(action.payload)// 不是纯函数
            const newState = {...state, language: action.payload};
            return newState;
        case ADD_LANGUAGE:
            const newSate = {...state, languageList: [...state.languageList, action.payload]};
            console.log(newSate);
            return newSate;
    }
    return state;
}

