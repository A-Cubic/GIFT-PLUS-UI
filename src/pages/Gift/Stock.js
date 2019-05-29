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
    //visible: false, 
    //done: false ,
    shop:'预到店'
  };

  // formLayout = {
  //   labelCol: { span: 7 },
  //   wrapperCol: { span: 13 },
  // };

  componentDidMount() {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'list/fetch',
    //   payload: {
    //     count: 5,
    //   },
    // });
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

  // showModal = () => {
  //   this.setState({
  //     visible: true,
  //     current: undefined,
  //   });
  // };

  // showEditModal = item => {
  //   this.setState({
  //     visible: true,
  //     current: item,
  //   });
  // };

  // handleDone = () => {
  //   setTimeout(() => this.addBtn.blur(), 0);
  //   this.setState({
  //     done: false,
  //     visible: false,
  //   });
  // };

  // handleCancel = () => {
  //   setTimeout(() => this.addBtn.blur(), 0);
  //   this.setState({
  //     visible: false,
  //   });
  // };

  // handleSubmit = e => {
  //   e.preventDefault();
  //   const { dispatch, form } = this.props;
  //   const { current } = this.state;
  //   const id = current ? current.id : '';

  //   setTimeout(() => this.addBtn.blur(), 0);
  //   form.validateFields((err, fieldsValue) => {
  //     if (err) return;
  //     this.setState({
  //       done: true,
  //     });
  //     dispatch({
  //       type: 'list/submit',
  //       payload: { id, ...fieldsValue },
  //     });
  //   });
  // };

  // deleteItem = id => {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'list/submit',
  //     payload: { id },
  //   });
  // };

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
    //console.log(77788,pagination)
    // const {
    //   list: { list },
    //   loading,
    // } = this.props;


    // const {
    //   form: { getFieldDecorator },
    // } = this.props;
    // const { visible, done, current = {} } = this.state;

    // const editAndDelete = (key, currentItem) => {
    //   if (key === 'edit') this.showEditModal(currentItem);
    //   else if (key === 'delete') {
    //     Modal.confirm({
    //       title: '删除任务',
    //       content: '确定删除该任务吗？',
    //       okText: '确认',
    //       cancelText: '取消',
    //       onOk: () => this.deleteItem(currentItem.id),
    //     });
    //   }
    // };
    //
    // const modalFooter = done
    //   ? { footer: null, onCancel: this.handleDone }
    //   : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

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

    // const paginationProps = {
    //   showSizeChanger: true,
    //   showQuickJumper: true,
    //   pageSize: 5,
    //   total: 50,
    // };

    const ListContent = ({ data: { goodsName,goodsnum,proportion} }) => (
      <div className={styles.listContent}>
        {/* <div className={styles.listContentItem}>
          <span>商品名称</span>
          <p>{goodsName}</p>
        </div> */}
        <div className={styles.listContentItem}>
          <span>商品数量</span>
          {/* <p>{Math.ceil(Math.random() * 50) + 50}</p> */}
          <p>{goodsnum}</p>
        </div>
        {/* <div className={styles.listContentItem}>
          <span>到店时间</span>
          <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
        </div> */}
        <div className={styles.listContentItem}>
          <span>库存比</span>
          <p><Progress percent={proportion} status='active' strokeWidth={6} style={{ width: 180 }} /></p>
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
                      page:page,
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
                      page:pagination.page,
                      status:this.state.shop
                    },
                  });

      
                },
                //pageSize: pagination.pageSize,
                pageSize:pagination.pageSize,
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
