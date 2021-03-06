import React from "react";
import logo from '../../assets/logo.svg';
import styles from "./Header.module.css";
import { Layout, Typography, Input, Menu, Button, Dropdown} from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { withRouter, RouteComponentProps } from "react-router-dom";
import store, { RootState } from "../../redux/store"
import { LanguageActionTypes, addLanguageActionCreator, changeLanguageActionCreateor} from "../../redux/language/languageActions";
import { LanguageState } from "../../redux/language/languageReducer";
import { withTranslation, WithTranslation } from "react-i18next";
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface State extends LanguageState {};
// 数据流入
const mapStateToProps = (state: RootState) => {
  return {
    language: state.language.language,
    languageList: state.language.languageList
  }
}
// 数据流出
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeLanguage: (code: "zh" | "en") => {
      const action = changeLanguageActionCreateor(code);
      dispatch(action);
    },
    addLanguage: (name: string, code: string) => {
      const action = addLanguageActionCreator(name, code);
      dispatch(action);
    }
  }
}

// ReturnType 反向注入
type PropsType = RouteComponentProps // react-router 路由props类型
& WithTranslation // i18n props类型
& ReturnType<typeof mapStateToProps> // redux store 类型;
& ReturnType<typeof mapDispatchToProps>

class HeaderComponent extends React.Component<PropsType>{
    // constructor(props:any){
    //   super(props);
    //   // const storeState = store.getState();

    //   this.state as State

    //   // store.subscribe(this.handleStoreChange.bind(this));
    // }
    // store 订阅处理函数
    // handleStoreChange= ()=>{
    //   const storestate = store.getState();
    //   this.setState({
    //     language: storestate.language,
    //     languageList: storestate.languageList
    //   })
    // }

    menuClickHandler = (e:any) => {
      console.log(e);
      let action:LanguageActionTypes;
      if(e.key === "new"){
        // 处理新语言添加action
        // action = addLanguageActionCreator( "new_lang"+Date.now(), "新语言")
        this.props.addLanguage("new_lang"+Date.now(), "新语言")
      }else{
        action = changeLanguageActionCreateor(e.key)
        this.props.changeLanguage(e.key)
      } 
    }

    render(){
      const { history, t} = this.props;
      return (
        <div className={styles['app-header']}> 
        {/* top-header */}
        <div className={styles["top-header"]}>
          <div className={styles.inner}>
          <Typography.Text>{t("header.slogan")}</Typography.Text>
          <Dropdown.Button style={{marginLeft: 15 }}
            overlay={
              <Menu onClick={this.menuClickHandler}>
                {this.props.languageList.map(l=>{
                  return <Menu.Item key={l.code}>{l.name}</Menu.Item>
                })}
                <Menu.Item key={"new"}>
                {t("header.add_new_language")}
                </Menu.Item>
              </Menu>
            }
            icon={<GlobalOutlined />}
          >
            {this.props.language === "zh"?"中文":"English"}
          </Dropdown.Button>
          <Button.Group className={styles["button-group"]}>
            <Button onClick={()=>this.props.history.push("register")}>{t("header.register")}</Button>
            <Button onClick={()=>this.props.history.push("signIn")}>{t("header.signin")}</Button>
          </Button.Group>
          </div>
        </div>
        <Layout.Header className={styles['main-header']}>
          <span onClick={()=>this.props.history.push("/")}>
            <img src={logo} alt="" className={styles['App-logo']}/>
            <Typography.Title level={3} className={styles.title}>
            {t("header.title")}
            </Typography.Title>
          </span>
          <Input.Search
            placeholder="请输入旅游目的地、主题、或关键字"
            className={styles["search-input"]}
          />
        </Layout.Header>
        <Menu mode={"horizontal"} className={styles["main-menu"]}>
          <Menu.Item key="1"> {t("header.home_page")} </Menu.Item>
          <Menu.Item key="2"> {t("header.weekend")} </Menu.Item>
          <Menu.Item key="3"> {t("header.group")} </Menu.Item>
          <Menu.Item key="4"> {t("header.backpack")} </Menu.Item>
          <Menu.Item key="5"> {t("header.private")} </Menu.Item>
          <Menu.Item key="6"> {t("header.cruise")} </Menu.Item>
          <Menu.Item key="7"> {t("header.hotel")} </Menu.Item>
          <Menu.Item key="8"> {t("header.local")} </Menu.Item>
          <Menu.Item key="9"> {t("header.theme")} </Menu.Item>
          <Menu.Item key="10"> {t("header.custom")} </Menu.Item>
          <Menu.Item key="11"> {t("header.study")} </Menu.Item>
          <Menu.Item key="12"> {t("header.visa")} </Menu.Item>
          <Menu.Item key="13"> {t("header.enterprise")} </Menu.Item>
          <Menu.Item key="14"> {t("header.high_end")} </Menu.Item>
          <Menu.Item key="15"> {t("header.outdoor")} </Menu.Item>
          <Menu.Item key="16"> {t("header.insurance")} </Menu.Item>
        </Menu>
      </div>
      ) 
    } 
}

// 组件与store建立连接
export const Header = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(HeaderComponent)));