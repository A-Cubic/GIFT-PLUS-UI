import React, { PureComponent }  from 'react';
import {Table ,Divider , message,Row, Col, Form,Input,DatePicker,Select,Button,Card,InputNumber, Radio,Icon,Tooltip} from 'antd';
import GGEditor, { Mind } from 'gg-editor';
import EditorMinimap from '../components/EditorMinimap';
import { MindContextMenu } from '../components/EditorContextMenu';
import { MindToolbar } from '../components/EditorToolbar';
import { MindDetailPanel } from '../components/EditorDetailPanel';
import data from '../mock/worldCup2018.json';
import styles from '../orderList/index.less';
import { FormattedMessage } from 'umi-plugin-react/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
GGEditor.setTrackable(false);

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;



@connect(({ loading ,orderListModel}) => ({
  submitting: loading.effects['form/submitRegularForm'],
  orderListModel
}))
@Form.create()
class MindPage extends PureComponent {

  state = { 
    storeCode:'',
    state:'',
    formValues:{},
    visible: false,
    visibleChildCheck:false,
    disabled: false,
    value: 1,
  };

  componentDidMount() {
    this.init()
  }

  init(){
    this.props.dispatch({
      type: 'orderListModel/getData',
      payload: {
        state:"预到店"
      },
    });
  }



  onSearch=(e)=>{
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
        type: 'orderListModel/getData',
        payload: {
          ...values,
        },
      });
    });
  }
  handleFormReset =()=>{
    this.props.form.resetFields();
    this.setState({
      formValues: {},
      sortedInfo: null,
    });
    this.init();
  }
  handleTableChange=(pagination, filters, sorter)=>{
    const params = {
      ...pagination,
      ...this.state.formValues,
    };
    this.props.dispatch({
      type: 'orderListModel/getData',
      payload: params,
    });
  }

  handleVisible = (flag,who) => {
    this.setState({
      visibleChildCheck:!!flag,
    });
  }

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
      disabled: !this.state.disabled,
    });
  };

  


  renderForm(){
  //const { roleOperationDistribution:{storesSales:{tableData:{item}}} } = this.props;
    const { getFieldDecorator } = this.props.form;
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

    //console.log('xxx',this.props)
    return (
      <Form onSubmit={this.onSearch} layout="inline">

        <FormItem {...formItemLayout} label='验证码'>
          {getFieldDecorator('storeCode', {
            rules: [{ required: true, message: '请输入手机验证码' }],
          })(<Input placeholder="请输入手机验证码"/>)}
        </FormItem>

        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="时间段：">
              {getFieldDecorator('date')(
                <RangePicker style={{ width: '100%' }}  placeholder={['开始日期', '结束日期']} />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="订单号：">
              {getFieldDecorator('orderCode')(
                <Input style={{ width: '100%' }} placeholder="请输入订单号" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="订单状态：">
              {getFieldDecorator('state')(
                 <Select  placeholder="请选择">
                  <Option value="预到店">预到店</Option>
                  <Option value="已到店">已到店</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="订单状态：">
              {/* {getFieldDecorator('p')(
                <Radio.Group onChange={this.onChange} value={this.state.value}>
                 <Radio value={1}>是</Radio>
                 <Radio value={2}>否</Radio>
                </Radio.Group>
              )} */}
               {getFieldDecorator('p', {
                initialValue: 1,
                //rules: [{ required: true, message: '请输入姓名' }],
              })(
                //<Input placeholder="请输入姓名"/>
                <Radio.Group onChange={this.onChange} value={this.state.value}>
                 <Radio value={1}>是</Radio>
                 <Radio value={2}>否</Radio>
                </Radio.Group>
              )}



            </FormItem>     
          </Col>



          <Col md={8} sm={24}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
          </Col>
        </Row>
        <Divider dashed />
        <div style={{ overflow: 'hidden',marginBottom:10,fontSize:16 }}>
          {/* <div style={{ float: 'right' }}>
            <span>零售价：<em style={{color:'orange',fontStyle:'normal'}}>{item.rprice}</em>  平台采购价：<em style={{color:'orange',fontStyle:'normal'}}>{item.inprice}</em>  平台供货价：<em style={{color:'orange',fontStyle:'normal'}}>{item.pprice} </em>服务费：<em style={{color:'orange',fontStyle:'normal'}}>{item.platformPrice}</em></span>
          </div> */}
        </div>
      </Form>
    );
  }
  

  render() {
    const { orderListModel:{dataAll:{item,list,pagination}} } = this.props;
   // console.log('777',list)

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
      }
      
    ];

    return (
      <PageHeaderWrapper
        title='订单列表'
      >
        <Card bordered={false}>

          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
          </div>

          <Table dataSource={list}
                 // scroll={{ x: 1500}}
                 rowKey={record => record.key}
                 columns={columns}
                 pagination={paginationProps}
                 onChange={this.handleTableChange}
                 // loading={submitting}
          />
          
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default MindPage;
