import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import { connect } from 'dva';
import {List,Card,Row,Col,Radio,Input,Progress,Button,Icon,Dropdown,Menu,Avatar,Modal,Form,DatePicker,Select,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Result from '@/components/Result';
import styles from './Stock.less';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;

@connect(({ list, loading ,StockModel}) => ({
  list,StockModel,
  loading: loading.models.list,
}))
@Form.create()
class Stock extends PureComponent {
  state = { 
   
    shop:'预到店'
  };

  

  componentDidMount() {
   
    this.init()
  }

  init(){
    this.props.dispatch({
      type: 'StockModel/getData',
      payload: {
        status:'预到店'
      },
    });
  }


  //点击遇到点
  handleSizeChange(e){
    this.setState({
      shop:e.target.value
    })

    this.props.dispatch({
      type: 'StockModel/getData',
      payload: {
        status:e.target.value
      },
    });

  }


  render() {
    const {StockModel:{dataAll:{item,pagination,list}}} = this.props;
    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="预到店" onChange={(e) => {this.handleSizeChange(e)}}>
          <RadioButton value="预到店">预到店</RadioButton>
          <RadioButton value="已到店">已到店</RadioButton>
        </RadioGroup>
      </div>
    );

    const ListContent = ({ data: { goodsName,goodsnum,proportion} }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>商品数量</span>
          <p>{goodsnum}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>库存比</span>
          <div><Progress percent={parseFloat(proportion)}  strokeWidth={6} style={{ width: 180 }} /></div>
        </div>
      </div>
    );
    return (
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          {/* <div>77777</div> */}
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="预到商品" value={item.movinGoods} bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="当前店铺库存" value={item.arriveGoods} bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="历史总库存" value={item.allGoods} />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title="库存列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <List
              size="large"
              rowKey="id"
             // loading={loading}
              //pagination={paginationProps}
              
              pagination={{
                onChange: (page) => {
                  this.props.dispatch({
                    type: 'StockModel/getData',
                    payload: {
                      current:page,
                      pageSize:pagination.pageSize,
                      status:this.state.shop
                    },
                  });
                },
                onShowSizeChange: (current, pageSize) => {
                
                  this.props.dispatch({
                    type: 'StockModel/getData',
                    payload: {
                      pageSize:pageSize,
                     // current:pagination.current,
                      status:this.state.shop
                    },
                  });

      
                },
              //  pageSize:pagination.pageSize,
                total: pagination.total,
                showSizeChanger: true,
                showQuickJumper: true,
              }}
              dataSource={list}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                   avatar={<Avatar src={item.goodsImg} shape="square" style={{marginRight:'200px'}} size="large" />}
                  //  title={item.title}
                  title="商品名称"
                    description={item.goodsName}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Stock;
