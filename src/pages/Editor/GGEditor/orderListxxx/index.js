import React, { PureComponent } from 'react';
import { List, Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker,Modal } from 'antd';
import GGEditor, { Flow } from 'gg-editor';
import EditorMinimap from '../components/EditorMinimap';
import { FlowContextMenu } from '../components/EditorContextMenu';
import { FlowToolbar } from '../components/EditorToolbar';
import { FlowItemPanel } from '../components/EditorItemPanel';
import { FlowDetailPanel } from '../components/EditorDetailPanel';
import styles from './index.less';
import { FormattedMessage } from 'umi-plugin-react/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import { connect } from 'dva';
import Ellipsis from '@/components/Ellipsis';

GGEditor.setTrackable(false);


const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;



@connect(({ list, loading ,ShopAssistantListModel }) => ({
  list,
  loading: loading.models.list,
  ShopAssistantListModel
}))
class FlowPage extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
    this.init()
  }

  init(){
    this.props.dispatch({
      type: 'ShopAssistantListModel/getData',
      payload: {
       
      },
    });
  }
  // handleDel(item,index) {
  //   console.log('index',item)
  //   this.props.dispatch({
  //     type: 'ShopAssistantListModel/getDel',
  //     payload: {
  //       userCode:item.userCode
  //     },
  //     callback: this.callbackType,
  //   });
  // }

  // callbackType = (params) => {
  //   console.log('1111callbackType',params.data.item.type)
  //   if(params.data.item.type == 1){
  //     this.init()
  //     console.log('ok')
  //   }
  // }  


  // renderForm(){
  //  // const { roleOperationDistribution:{storesSales:{tableData:{item}}} } = this.props;
  //   const {ShopAssistantListModel:{dataAll:{item,pagination,list}}} = this.props;
  //   //const { getFieldDecorator } = this.props.form;

  //   const {
  //     form: { getFieldDecorator, getFieldValue },
  //   } = this.props;

  //   //console.log('xxx',this.props)
  //   return (
  //     <Form onSubmit={this.onSearch} layout="inline">
  //       <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
  //         <Col md={9} sm={24}>
  //           <FormItem label="单据日期：">
  //             {getFieldDecorator('date')(
  //               <RangePicker style={{ width: '100%' }}  placeholder={['开始日期', '结束日期']} />
  //             )}
  //           </FormItem>
  //         </Col>
  //         <Col md={9} sm={24}>
  //           <FormItem label="采购商：">
  //             {getFieldDecorator('purchaseName')(
  //               <Input style={{ width: '100%' }} placeholder="可输入采购商名称进行查询" />
  //             )}
  //           </FormItem>
  //         </Col>
  //         <Col md={6} sm={24}>
  //           <Button type="primary" htmlType="submit">查询</Button>
  //           <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
  //         </Col>
  //       </Row>
  //       <Divider dashed />
  //       <div style={{ overflow: 'hidden',marginBottom:10,fontSize:16 }}>
  //         <div style={{ float: 'right' }}>
  //           <span>零售价：<em style={{color:'orange',fontStyle:'normal'}}>{item.rprice}</em>  平台采购价：<em style={{color:'orange',fontStyle:'normal'}}>{item.inprice}</em>  平台供货价：<em style={{color:'orange',fontStyle:'normal'}}>{item.pprice} </em>服务费：<em style={{color:'orange',fontStyle:'normal'}}>{item.platformPrice}</em></span>
  //         </div>
  //       </div>
  //     </Form>
  //   );
  // }




  render() {
    const {ShopAssistantListModel:{dataAll:{item,pagination,list}}} = this.props;
    // const {
    //   list: { list },
    //   loading,
    // } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    // const {
    //   form: { getFieldDecorator, getFieldValue },
    // } = this.props;

    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    


    const columns = [
      {
        title: '序号',
        dataIndex: 'keyId',
        key: 'keyId',
      },{
        title: '订单号',
        dataIndex: 'orderId',
        key: 'orderId',
      } ,{
        title: '销售日期',
        dataIndex: 'tradeTime',
        key: 'tradeTime',
      }, {
        title: '采购商',
        dataIndex: 'purchaseName',
        key: 'purchaseName',
      }, {
        title: '零售价',
        dataIndex: 'rprice',
        key: 'rprice',
        render:val=>`¥${val}`
      },{
        title: '平台采购价（元）',
        dataIndex: 'inprice',
        key: 'inprice',
        render:val=>`¥${val}`
      },{
        title: '平台供货价（元）',
        dataIndex: 'pprice',
        key: 'pprice',
        render:val=>`¥${val}`
      },{
        title: '服务费（元）',
        dataIndex: 'platformPrice',
        key: 'platformPrice',
        render:val=>`¥${val}`
      },{
        title: '操作',
        dataIndex: '',
        key: '',
        render: (val,record) =>
        <div>
            {<a onClick={(e) => this.handlestoresSalesClick(e, record)}>查看</a>}
        </div>
      }
    ];

    const props = {
      //action: getUploadUrl(),
      //headers: getHeader(),
      showUploadList: false,
      // listType: 'picture',
      // accept:'image/*',
      onChange: this.handleUploadChange,
      multiple: false,
      // customRequest:this.upload,
    };






    const content = (
      <div className={styles.pageHeaderContent}>
        
        
      </div>
    );

    const extraContent = (
      <div className={styles.extraImg}>
        <img
          alt="这是一个标题"
          src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
        />
      </div>
    );

    return (
      // <PageHeaderWrapper title="店员列表" content={content} extraContent={extraContent}>
      <PageHeaderWrapper title="店员列表" >
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
            <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label='验证码'>
              {getFieldDecorator('storeCode', {
                rules: [{ required: true, message: '请输入手机验证码' }],
              })(<Input placeholder="请输入手机验证码"/>)}
            </FormItem>
            <FormItem {...formItemLayout} label='可注册数量'>
              {getFieldDecorator('state', {
                rules: [{ required: true, message: '请输入注册数量' }],
              })(<Input placeholder="请输入注册数量"/>)}
            </FormItem>
            
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
             
              <Row style={{marginTop:'15px', marginBottom:'5px',textAlign:'center'}}>
                <Col md={24} sm={24}>
                  <Button style={{textAlign:'center'}} type="primary" htmlType="submit" loading={submitting}>
                    提交
                  </Button>
                  <Button onClick={this.handleFormReset} style={{ marginLeft: 8 }}>
                    重置
                  </Button>
                </Col>
              </Row>
              {/* <Button style={{ marginLeft: 8 }}>
                <FormattedMessage id="form.save" />
              </Button> */}
            </FormItem>
          </Form>
            </div>
          </div>

        </Card>

        <div className={styles.cardList}>
          <div>888</div>
          <List
            // rowKey="id"
            rowKey={item.key}
           // loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={['', ...list]}
            pagination={{
                

              onChange: (page) => {
                this.props.dispatch({
                  type: 'StockModel/getData',
                  payload: {
                    page:page,
                    pageSize:pagination.pageSize,
            
                  },
                });
              },
              onShowSizeChange: (current, pageSize) => {
               // console.log('999')
                this.props.dispatch({
                  type: 'StockModel/getData',
                  payload: {
                    pageSize:pageSize,
                    page:pagination.page,
                 
                  },
                });

    
              },
              pageSize:pagination.pageSize,
              total: pagination.total,
              showSizeChanger: true,
              showQuickJumper: true,
            }}
            renderItem={(item ,index)=>
              item ? (
                <List.Item key={item.id}>
                  {/* <Card hoverable className={styles.card} actions={[<a onClick={() => {this.handleDel(item,index)}}>删除</a>]}> */}
                  <Card hoverable className={styles.card} >
                    <Card.Meta
                      avatar={<img className={styles.cardAvatar} src={item.img} />}
                      title={<a className={styles.cards} style={{paddingTop:'12px'}}>{item.userName}</a>}
                      // description={
                      //   <Ellipsis className={styles.item} lines={3}>
                      //     {item.description}
                      //   </Ellipsis>
                      // }
                    />
                    <p className={styles.cards} style={{marginTop:'25px'}}>电话：{item.phone}</p>
                    <p className={styles.cards} >性别：{item.sex}</p>
                    
                
                  </Card>
                </List.Item>
              ) : (
                <span></span>
                // <List.Item>
                //   <Button type="dashed" className={styles.newButton}>
                //     <Icon type="plus" /> 新建产品
                //   </Button>
                // </List.Item>
              )
            }
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default FlowPage;