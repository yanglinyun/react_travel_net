import React from 'react';
import {Header, Footer, Carousel, SideMenu, ProductCollection, BusinessPartners} from "../../components"
import {Row, Col, Typography, Spin} from "antd";
import styles from "./HomePage.module.css";
import { productList1, productList2, productList3} from './mockups';
import sideImage from '../../assets/images/sider_2019_12-09.png';
import sideImage2 from '../../assets/images/sider_2019_02-04.png';
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png';
import { withTranslation, WithTranslation} from "react-i18next";
import { t } from 'i18next';
import axios from 'axios';
import { connect } from "react-redux";
import { RootState } from "../../redux/store"
import { giveMeDataActionCreator } from "../../redux/recommendProducts/recommendProductsActions"
// 首字母小写为HOC 大写为类型定义

// interface State {
//   loading: boolean,
//   error: string | null,// 数据获取失败
//   productList: any[],

// }

const mapStateToProps = (state: RootState) => {
  return {
    loading: state.recommendProducts.loading,
    error: state.recommendProducts.error,
    productList: state.recommendProducts.productList
  }
}

const  mapDispatchToProps = (dispatch) => {
  return {
    giveMeData: ()=>{
      dispatch(giveMeDataActionCreator());
    }
  }
}

type PropsType = WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

class HomePageComponent extends React.Component<PropsType /*, State*/> {
    // constructor(props){
    //   super(props);
    //   this.state = {
    //     loading: true,
    //     error: null,
    //     productList: []
    //   }
    // }

    componentDidMount() {
      this.props.giveMeData();
    }

    render() {
      // t 即为 translation 可以访问语言json文件 
        const { productList, loading, error} = this.props;
        if(loading){
          return (<Spin
          size= "large"
          style={{
            marginTop: 200,
            marginBottom: 200,
            marginLeft: "auto",
            marginRight: "auto",
            width: "100%"
          }}
          />)
        }

        if(error!=null){
          return (<div>网站出错: {error }</div>)
        }
        return (<>
            <div className={styles.App}>
      <Header/>
      {/* 页面内容 content */}
      <div className={styles['page-content']}>
         <Row style={{marginTop:20}}>
            <Col span={6}>
              <SideMenu />
            </Col>
            <Col span={18}>
              <Carousel />
            </Col>
         </Row>
         <ProductCollection 
          title={<Typography.Title level={3} type="warning">
            {t("home_page.hot_recommended") as any}
          </Typography.Title>}
          sideImage={sideImage}
          products={productList}
         />
         <ProductCollection 
          title={<Typography.Title level={3} type="danger">
             {t("home_page.new_arrival") as any}
          </Typography.Title>}
          sideImage={sideImage2}
          products={productList}
         />
         <ProductCollection 
          title={<Typography.Title level={3} type="success">
            {t("home_page.domestic_travel") as any}
          </Typography.Title>}
          sideImage={sideImage3}
          products={productList}
         />
          <BusinessPartners />
      </div>
      <Footer/>
    </div>
        </>)
    }
}

//                            store与state映射函数 组件
export const HomePage = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HomePageComponent));