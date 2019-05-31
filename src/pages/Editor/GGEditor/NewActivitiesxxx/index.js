import React, { PureComponent ,Fragment }  from 'react';
import { Table ,message,Row, Col, Form,Input,DatePicker,Select,Button,Card,InputNumber, Radio,Icon,Tooltip} from 'antd';
import GGEditor, { Mind } from 'gg-editor';
import EditorMinimap from '../components/EditorMinimap';
import { MindContextMenu } from '../components/EditorContextMenu';
import { MindToolbar } from '../components/EditorToolbar';
import { MindDetailPanel } from '../components/EditorDetailPanel';
import data from '../mock/worldCup2018.json';
import styles from '../NewActivitiesxxx/index.less';
import { FormattedMessage } from 'umi-plugin-react/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
GGEditor.setTrackable(false);

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;



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
    usercode:''

  };


  componentDidMount() {
    this.init()
   
  }

  init(){
    this.props.dispatch({
      
      type: 'orderListModel/getData',
      payload: {
        
      },
    });
  }  


  handleSubmit=(e)=>{

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
      this.props.dispatch({
        type: 'NewActivitiesModel/getSubmit',
        payload: {
          ...values,
        },
      });
    });
  }

  callbackType = (params) => {
    console.log('callbackType',params.data.msg)
    if(params.data.type == 1){
      message.success('注册成功')
      this.handleFormReset()
    } else {
      message.error(params.data.msg);
    }
  }  
  
  handleFormReset =()=>{
    this.props.form.resetFields();
    
  }


  toggle = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
      disabled: !this.state.disabled,
    });
  };

  //删除
  handleDelCheck = (e, record, index)=>{
    console.log('777index',index)
    this.props.dispatch({
      type: 'orderListModel/deleteGoodsList',
      payload: {
        id:record.id,
        barcode:record.barcode,
        index:index
      },
    });
  }







 

  render() {

    const { orderListModel:{dataAll:{item,list,pagination}} } = this.props;
    console.log('777',list)

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
        title: '状态',
        dataIndex: 'state',
        key: 'state',
      } ,{
        title: '时间段',
        dataIndex: 'payTime',
        key: 'payTime',
      }
      , {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
      }
      , {
        title: '订单号',
        dataIndex: 'orderCode',
        key: 'orderCode',
      },
      {
        title: '商品数量',
        dataIndex: 'goodsNum',
        key: 'goodsNum',
        render: (val,record,e) =>{
          return (
            <InputNumber
              style={{textAlign:'center'}}
              className={styles.displayNo}
              onChange={this.onChangeNum}
              onBlur={()=>this.inputOnBlur(record) }
              onFocus={()=>this.inputonFocus(record) }
              // min={parseInt(1)}
              // max={parseInt(record.mNum)}
              defaultValue={record.goodsNum}
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
                rules: [{ required: true, message: '请输入标题名' }],
              })(<Input placeholder="请输入标题名"/>)}
            </FormItem>
            <FormItem {...formItemLayout} label='时间段'>
              {getFieldDecorator('activeTime', {
                rules: [{ required: true, message: '请输入时间' }],
              })(<RangePicker style={{ width: '100%' }}  placeholder={['开始日期', '结束日期']} />)}
            </FormItem>
            <FormItem {...formItemLayout} label='活动金额'>
            {getFieldDecorator('activeType', {
               initialValue: '0'
              })(
                <Radio.Group onChange={this.toggle} setFieldsValue={this.state.value}>
                  <Radio value={'0'}>消费</Radio>
                  <Radio value={'1'}>签到</Radio>
                </Radio.Group>)} 
            </FormItem>
            <FormItem {...formItemLayout} label='金额'>
              {getFieldDecorator('consume', {
                
              })( <Input placeholder="请输入金额" style={{width:'75%',marginRight:'6px'}} disabled={this.state.disabled}  />)}
              <span>元</span>
            </FormItem>  
            <FormItem {...formItemLayout} label='奖励心值'>
              {getFieldDecorator('heartItemValue', {
              })(<Input placeholder="请输入奖励心值"/>)}
            </FormItem>    
            <FormItem {...formItemLayout} label='奖励上限值'>
              {getFieldDecorator('limitItemValue', {
              })(<Input placeholder="请输入奖励上限值"/>)}
            </FormItem>     
            
            <Button type="primary" style={{margin:'7px'}}>选择商品</Button >
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
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default orderList;
