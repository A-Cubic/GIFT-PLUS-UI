import React, {Component , PureComponent ,Fragment }  from 'react';
import {Modal , Table ,message,Row, Col, Form,Input,DatePicker,Select,Button,Card,InputNumber, Radio,Icon,Tooltip} from 'antd';
import GGEditor, { Mind } from 'gg-editor';
// import EditorMinimap from '../components/EditorMinimap';
// import { MindContextMenu } from '../components/EditorContextMenu';
// import { MindToolbar } from '../components/EditorToolbar';
// import { MindDetailPanel } from '../components/EditorDetailPanel';
// import data from '../mock/worldCup2018.json';
import styles from '../NewActivities/index.less';
import { FormattedMessage } from 'umi-plugin-react/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';

import { routerRedux } from 'dva/router';
import moment from 'moment';

GGEditor.setTrackable(false);

const FormItem = Form.Item;
const { Option } = Select;
//const { RangePicker } = DatePicker;
const { TextArea } = Input;
const RangePicker = DatePicker.RangePicker;
const dateFormat = 'YYYY.MM.DD';
//const { MonthPicker, RangePicker } = DatePicker;

// const dateFormat = 'YYYY/MM/DD';
// const monthFormat = 'YYYY/MM';

// const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];




@connect(({ loading ,NewActivitiesModel,orderListModel}) => ({
  submitting: loading.effects['form/submitRegularForm'],
  NewActivitiesModel,
  orderListModel
}))
@Form.create()
class orderList extends PureComponent {

  state = { 
    storeCode:'',
    state:'',
    disabled: false,
    value: 0,
    value: undefined,
    valueGoodsNum:'',
    valueSafeNum:'',
    purchase:false,
    usercode:'',
    valueDetails:{},
    list:[]
  };

  componentDidMount() {
    this.init()
  }
  init(){
    this.props.dispatch({
      //type: 'orderListModel/getData',
      type: 'NewActivitiesModel/getMakeSureGoodsList',
      payload: {
      },
    });
  }  

  //提交
  handleSubmit=(e)=>{
    const { NewActivitiesModel:{inputVal:{item},dataAll:{list,pagination}} } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;
      const rangeValue = fieldsValue['date'];
      const values = rangeValue==undefined ? {
        ...fieldsValue,
      }:{
        ...fieldsValue,
        'date': rangeValue==''?[]:[rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
      };

      this.setState({
        formValues: values,
      });

      //console.log('777888',values)
      // this.props.dispatch({
      //   type: 'NewActivitiesModel/getSubmit',
      //   payload: {
      //     ...values,
      //     list:list
      //   },
      //   callback: this.callbackType,
      // });
      
      this.props.dispatch({
        // type: 'NewActivitiesModel/getRecordR',getMakeSureGoodsListR
        type: 'NewActivitiesModel/getRecordR',
        payload: {
          ...values,
        },
      });
      this.props.dispatch({
        type: 'NewActivitiesModel/getHandleOkR',
        payload: {
        },
      });
      
    });
  }

  // callbackType = (params) => {
  //   //console.log('callbackType',params)
  //   if(params.success==true){
  //     this.props.dispatch(routerRedux.push('/activity/list'  ))
  //     this.props.dispatch({
  //       //type: 'orderListModel/getData',
  //       type: 'NewActivitiesModel/getCelarR',
  //       payload: {
  //       },
  //     });
  //     message.success('提交成功') 
  //   }
  // }  
  
  handleFormReset =()=>{
    this.props.form.resetFields();
    
  }


  toggle = e => {
   // console.log('radio checked', e.target.value);
    if(e.target.value == 0){
      this.setState({
        value: e.target.value,
        disabled: false,
      });
    } else {
      this.setState({
        value: e.target.value,
        disabled: true,
      });
    }
    
  };

  //删除
  handleDelCheck = (e, record, index)=>{
   // console.log('777index',index)
   
    this.props.dispatch({
      type: 'NewActivitiesModel/getChoseGoods',
      payload: {
        goodsId:record.goodsId,
        type:false
      },
      callback: (params) => {
        if(params.success==true){
          const { NewActivitiesModel:{inputVal:{item},dataAll:{list,pagination}} } = this.props;
          this.props.dispatch({
            //type: 'orderListModel/getData',
            type: 'NewActivitiesModel/getDelR',
            payload: {
              goodsId:record.goodsId,
            },
          });
          message.success('删除成功')  
          //console.log('777删除',list)
        }
      }
    });

    //this.init()
  }
  

 

  //翻页
  handleTableChange=(pagination, filters, sorter)=>{
    const params = {
      ...pagination,
      ...this.state.formValues,
    };
    this.props.dispatch({
      type: 'NewActivitiesModel/getMakeSureGoodsList',
      payload: params,
    });
  }


  //选择发货商品按钮
  onhandleGoods = (e) => {
   // const { roleOperationDistribution:{deliveryForm:{tableData:{list, pagination,item}}} } = this.props;
  
   e.preventDefault();
   this.props.form.validateFields((err, fieldsValue) => {
     if (err) return;
     const rangeValue = fieldsValue['date'];
     const values = rangeValue==undefined ? {
       ...fieldsValue,
     }:{
       ...fieldsValue,
       'date': rangeValue==''?[]:[rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
     };

     this.setState({
       formValues: values,
     });
    // console.log('values',values)
    //  this.props.dispatch({
    //    type: 'NewActivitiesModel/getSubmit',
    //    payload: {
    //      ...values,
    //    },
    //  });
    this.props.dispatch({
      // type: 'NewActivitiesModel/getRecordR',getMakeSureGoodsListR
      type: 'NewActivitiesModel/getRecordR',
      payload: {
        ...values,
      },
    });
    this.props.dispatch(routerRedux.push('/chooseCommodity'  ))
   }); 


  }


  


  inputonFocus = (record,val) =>{
    //console.log('22Focus')
    const { NewActivitiesModel:{inputVal:{item},dataAll:{list,pagination}} } = this.props;
    //console.log('record.goodsNum',record.goodsNum)
     this.setState({
       valueGoodsNum: record.goodsNum
     })

    //  const a = list;
    //  a.map((item) => {
      
    //    if(item.goodsId == record.goodsId && this.state.valueDetails[item.goodsId] != undefined){
    //      // item.demand=this.state.valueDetails[item.keyId]
    //      item.goodsNums=this.state.valueDetails[item.goodsId]
    //    }
    //  })

    //  this.setState({
    //    list: a
    //  })
    // console.log('aaaaaa',this.state.list)

    


   }
   //数量改变
   onChangeNum=(v,r)=>{
    //console.log('v',v)
    this.setState({
      valueGoodsNum: v
    });
    // const sss = r.goodsId;
    // this.setState({
    //   valueDetails: {...this.state.valueDetails, [sss]: v}
    // });

    //console.log('valueDetails',this.state.valueDetails)
    const { NewActivitiesModel:{inputVal:{item},dataAll:{list,pagination}} } = this.props;
    //const { NewActivitiesModel:{dataAll:{popup}} = this.props;
     const b = list.map((item) => {
      return {
       goodsNum:this.state.valueGoodsNum, //发货数量
       goodsId:r.goodsId,
      }
     })
     //查找
     const c =b.find(item=>
       item.goodsId===r.goodsId
     )
    if(this.state.valueGoodsNum != ''){
     
      if(c.goodsNum != undefined){
        this.props.dispatch({
          type: 'NewActivitiesModel/getChangeNum',
          //payload: c,
          payload: {
            // barcode: c.barcode,
            // goodsNum: c.goodsNum,
            // id: c.id
            goodsId:c.goodsId,
            goodsNums:c.goodsNum
            
          },
        });
      }else {
        //message.error('');
      }
      
    }



  }



//鼠标离开改数
  //onChange
  inputOnBlur = (record,val) =>{
    //console.log('1111OnBlur') popup
    // const { NewActivitiesModel:{inputVal:{item},dataAll:{list,pagination}} } = this.props;
    // //const { NewActivitiesModel:{dataAll:{popup}} = this.props;
    //  const b = list.map((item) => {
    //   return {
    //    goodsNum:this.state.valueGoodsNum, //发货数量
    //    goodsId:record.goodsId,
    //   }
    //  })
    //  //查找
    //  const c =b.find(item=>
    //    item.goodsId===record.goodsId
    //  )
    // if(this.state.valueGoodsNum != ''){
     
    //   if(c.goodsNum != undefined){
    //     this.props.dispatch({
    //       type: 'NewActivitiesModel/getChangeNum',
    //       //payload: c,
    //       payload: {
    //         // barcode: c.barcode,
    //         // goodsNum: c.goodsNum,
    //         // id: c.id
    //         goodsId:c.goodsId,
    //         goodsNums:c.goodsNum
            
    //       },
    //     });
    //   }else {
    //     //message.error('');
    //   }
      
    // }



   }


   



   handleOk = (e) => {
    
  }

  // hanldeOpen(){
  //   this.props.dispatch({
  //     type: 'NewActivitiesModel/getHandleOkR',

  //     payload: {
       
  //     },
  //   });
  // }
 

  render() {

    const { NewActivitiesModel:{inputVal:{item},dataAll:{list,pagination}} } = this.props;
    const { NewActivitiesModel:{see:{popup}} } = this.props;
    //const { NewActivitiesModel:{dataAll:{popup} }} = this.props;
    //console.log('777',popup)
   // console.log('item',this.props)

    const RadioGroup = Radio.Group;
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

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };
    const columns = [
      {
        title: '序号',
        dataIndex: 'key',
        key: 'key',
      },{
        title: '商品名',
        dataIndex: 'goodsName',
        key: 'goodsName',
      } ,{
        title: '图片',
        dataIndex: 'imga',
        key: 'imga',
        render: (val,record) => (
          <div>
            <span>{val}</span>
            <img src={ record.img} alt="" width={40} style={{marginLeft:0}}/>
          </div>
        )
      }
      , {
        title: '进货价格',
        dataIndex: 'goodsCost',
        key: 'goodsCost',
      }
      , {
        title: '售价',
        dataIndex: 'goodsPrice',
        key: 'goodsPrice',
      },
      {
        title: '库存',
        dataIndex: 'goodsNum',
        key: 'goodsNum',
      },
      ,
      {
        title: '商品数量',
        dataIndex: 'goodsNumx',
        key: 'goodsNumx',
        render: (val,record,e) =>{
          return (
            <InputNumber
              style={{textAlign:'center'}}
              className={styles.displayNo}
              onChange={(e)=>{this.onChangeNum(e, record)}}
              onBlur={()=>this.inputOnBlur(record) }
              onFocus={()=>this.inputonFocus(record) }
              min={parseInt(1)}
              max={parseInt(record.goodsNum)}
              defaultValue={1}
            />
          )
        }
      },{
        title: '操作',
        dataIndex: 'goMoney',
        key: 'goMoney',
        render: (text, record, index) => {
          return (
            <Fragment>
              <a href="javascript:;" onClick={(e) => this.handleDelCheck(e, record, index)}>删除</a><br/>
            </Fragment>
          )
        }
      }


    ];



    return (
      <PageHeaderWrapper
        title='新增活动'
       
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label='标题名'>
              {getFieldDecorator('activeRemark', {
                initialValue: item==null?'':item.activeRemark,
               // rules: [{ required: true, message: '请输入标题名' }],
              })(<Input placeholder="请输入标题名"/>)}
            </FormItem>
            <FormItem {...formItemLayout}  label='时间段'>
              {getFieldDecorator('date', {
                initialValue: item.date==undefined || item.date==''?null:[moment(item.date[0], dateFormat), moment(item.date[1], dateFormat)],
                
               
               // rules: [{ required: true, message: '请输入时间' }],
              })(
              <RangePicker style={{ width: '100%' }}  placeholder={['开始日期', '结束日期']} />
              )}
             
             {/* <FormItem label="时间段：">
              {getFieldDecorator('date')(
                <RangePicker style={{ width: '100%' }}  placeholder={['开始日期', '结束日期']} />
              )}
            </FormItem> */}
                
            

              
             

            </FormItem>
            <FormItem {...formItemLayout} label='活动金额'>
            {/* {getFieldDecorator('activeType', {
               initialValue: '0'
              })(
                <Radio.Group onChange={this.toggle} setFieldsValue={this.state.value}>
                  <Radio value={'0'}>消费</Radio>
                  <Radio value={'1'}>签到</Radio>
                </Radio.Group>)}  */}

              {getFieldDecorator('activeType',{
                
                initialValue:item==null?0:parseInt(item.activeType )
              })(
                <RadioGroup  onChange={this.toggle}     >
                  <Radio  value={0}>消费</Radio>
                  <Radio value={1}>签到</Radio>
                </RadioGroup>
              )}      


            </FormItem>
            <FormItem {...formItemLayout} label='金额'>
              {getFieldDecorator('consume', {
                initialValue: item==null?'':item.consume
              })( <Input placeholder="请输入金额" style={{width:'75%',marginRight:'6px'}} disabled={this.state.disabled}  />)}
              <span>元</span>
            </FormItem>  
            <FormItem {...formItemLayout} label='奖励心值'>
              {getFieldDecorator('heartItemValue', {
                initialValue: item==null?'':item.heartItemValue
              })(<Input placeholder="请输入奖励心值"/>)}
            </FormItem>    
            <FormItem {...formItemLayout} label='奖励上限值'>
              {getFieldDecorator('limitItemValue', {
                initialValue: item==null?'':item.limitItemValue
              })(<Input placeholder="请输入奖励上限值"/>)}
            </FormItem>     
            
            <Button type="primary" style={{margin:'7px'}} onClick={this.onhandleGoods}>选择商品</Button >
            <Table dataSource={list}
                 // scroll={{ x: 1500}}
                 rowKey={record => record.key}
                 columns={columns}
                 pagination={paginationProps}
                 onChange={this.handleTableChange}
                 // loading={submitting}
            />  


            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
             
              <Row style={{marginTop:'15px', marginBottom:'5px',textAlign:'center'}}>
                <Col md={24} sm={24}>
                  <Button style={{textAlign:'center'}} type="primary" htmlType="submit" loading={submitting}>
                    提交
                  </Button>
                  {/* <Button onClick={this.hanldeOpen.bind(this)} style={{ marginLeft: 8 }}>
                    打开
                  </Button> */}
                </Col>
              </Row>
              {/* <Button style={{ marginLeft: 8 }}>
                <FormattedMessage id="form.save" />
              </Button> */}
            </FormItem>
          </Form>
        </Card>
        <StoresSalesSee />
      </PageHeaderWrapper>

    );
  }
}


//弹窗
@connect(({NewActivitiesModel}) => ({
  NewActivitiesModel
}))
@Form.create()
class StoresSalesSee  extends Component {
  state={
    isSocket:''
  }

  handleCancel = () => {
    this.props.form.resetFields();
    this.props.dispatch({
      type:'NewActivitiesModel/getHandleCR',
      
    });
    
  }
  handleOk = (e) => {
    console.log('ok')
    // const _that = this
    // e.preventDefault();
    // this.props.form.validateFields((err, fieldsValue)=>{
    //   if(!err){
    //       // _that.props.dispatch({
    //       //   type:'roleRetaiBusManagement/getPayment',
    //       //   payload:{
    //       //     ...fieldsValue,
                  
    //       //   },
    //       //   callback: _that.callbackType,
    //       // });

    //   }
    // })
  }
//提交
handleSubmit=(e)=>{
  const { NewActivitiesModel:{inputVal:{item},dataAll:{list,pagination}} } = this.props;
  
  e.preventDefault();
  this.props.form.validateFields((err, fieldsValue) => {
    if (err) return;
    const rangeValue = fieldsValue['date'];
    const values = rangeValue==undefined ? {
      ...fieldsValue,
    }:{
      ...fieldsValue,
      'date': rangeValue==''?[]:[rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
    };

   
    this.setState({
      formValues: values,
    });

    //console.log('fssss',values)
    this.props.dispatch({
      type: 'NewActivitiesModel/getSubmit',
      payload: {
        ...item,
        list:list
      },
      callback: this.callbackType,
    });
    //this.props.dispatch(routerRedux.push('/activity/list'  ))



    
  });
}

callbackType = (params) => {
 // console.log('callbackType',params)
  if(params.success==true){
    this.props.dispatch(routerRedux.push('/activity/list'  ))
    this.props.dispatch({
      //type: 'orderListModel/getData',
      type: 'NewActivitiesModel/getCelarR',
      payload: {
      },
    });
    this.props.dispatch({
      type:'NewActivitiesModel/getHandleCR',
      
    });
    message.success('提交成功') 
  }
}  
  

  render(){
    const { NewActivitiesModel:{see:{popup}} } = this.props;
    const { NewActivitiesModel:{inputVal:{item}} } = this.props;
   // console.log('item',item)
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <Modal
          visible= {popup}
          onCancel={this.handleCancel}
          width={'35%'}
          onOk={this.handleSubmit}
          style={{padding:'20px'}}
        >
          <div style={{textAlign:"center",}}>确认提交？</div>
        </Modal>
      </div>
    )
  }
}










export default orderList;
