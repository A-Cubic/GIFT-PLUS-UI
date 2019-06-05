import React, { PureComponent ,Fragment}  from 'react';
import {Checkbox ,Table ,Divider , message,Row, Col, Form,Input,DatePicker,Select,Button,Card,InputNumber, Radio,Icon,Tooltip} from 'antd';
import GGEditor, { Mind } from 'gg-editor';
import styles from '../NewActivities/index.less';
import { FormattedMessage } from 'umi-plugin-react/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
//import { formatMessage } from 'umi-plugin-react/locale';
GGEditor.setTrackable(false);

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;



@connect(({ NewActivitiesModel}) => ({
 
  NewActivitiesModel
}))
@Form.create()
class chooseCommodity extends PureComponent {

  state = { 
    storeCode:'',
    state:'',
    formValues:{},
    visible: false,
    visibleChildCheck:false,
  };

  componentDidMount() {
    this.init()
  }

  init(){
    this.props.dispatch({
      type: 'NewActivitiesModel/getChooseCommodityData',
      payload: {
        //state:"预到店"
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
        type: 'NewActivitiesModel/getChooseCommodityData',
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
      type: 'NewActivitiesModel/getChooseCommodityData',
      payload: params,
    });
  }

  handleVisible = (flag,who) => {
    this.setState({
      visibleChildCheck:!!flag,
    });
  }

  //勾选
  Checklist = (e, record, index)=>{
    // console.log('e',e.target.checked)
    // console.log('record',record.goodsId)
    // console.log('index',index)

    this.props.dispatch({
      type: 'NewActivitiesModel/getChoseGoods',
      
      payload: {
        // id: this.props.roleOperationDistribution.selectProduct.tableData.item.id,
        // usercode:this.props.roleOperationDistribution.selectProduct.usercode,
        // ischoose:e.target.checked,
        // barcode:record.barcode
        goodsId:record.goodsId,
        type:e.target.checked
      },
    });
  }


 //点击发货单
  // handleInvoice = () => {
  //   // this.props.dispatch({
  //   //   type: 'roleOperationDistribution/getPaging',
  //   //   payload: {
  //   //     id: this.props.roleOperationDistribution.selectProduct.tableData.item.id,
  //   //   },
  //   // });
  //   //  this.props.dispatch(routerRedux.push('/delivery/deliveryForm/' ));
  //   this.props.dispatch(routerRedux.push('/delivery/returnDeliveryForm' ));  
  // }

  
  //确定
  handleDetermine() {
    this.props.dispatch(routerRedux.push('/activity/new'  ))
  }
  //取消
  handleCancel (){
    this.props.dispatch({
      type: 'NewActivitiesModel/getChooseCancel',
      payload: {
        //state:"预到店"
      },
    });
  }


  renderForm(){
    const { NewActivitiesModel:{chooseCommodity:{item,list,pagination}} } = this.props;
    const { getFieldDecorator } = this.props.form;
    
    //console.log('xxx',this.props)
    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          {/* <Col md={8} sm={24}>
            <FormItem label="时间段：">
              {getFieldDecorator('date')(
                <RangePicker style={{ width: '100%' }}  placeholder={['开始日期', '结束日期']} />
              )}
            </FormItem>
          </Col> */}
          <Col md={8} sm={24}>
            <FormItem label="商品名：">
              {getFieldDecorator('goodsName')(
                <Input style={{ width: '100%' }} placeholder="请输入商品名" />
              )}
            </FormItem>
          </Col>
          {/* <Col md={8} sm={24}>
            <FormItem label="订单状态：">
              {getFieldDecorator('state')(
                 <Select  placeholder="请选择">
                  <Option value="预到店">预到店</Option>
                  <Option value="已到店">已到店</Option>
                </Select>
              )}
            </FormItem>
          </Col> */}
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
    const { NewActivitiesModel:{chooseCommodity:{item,list,pagination}} } = this.props;
   // console.log('777',list)

  const { selectedRowKeys } = this.state;
  const rowSelection = {
    selectedRowKeys,
    onChange: this.onSelectedRowKeysChange
  };


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
        title: '选择',
        dataIndex: 'qq',
        key: 'qq',
        render: (text, record, index) => {
          return (
            <Fragment>
              {/* <a href="javascript:;" onClick={(e) => this.handleDelCheck(e, record, index)}>删除</a><br/> */}
              <Checkbox
                onChange={(e) => this.Checklist(e, record, index)}
                defaultChecked = {record.ischoose}
              >
              </Checkbox>
            </Fragment>
          )
        }
      },
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
    }, {
      title: '图片',
      dataIndex: 'png',
      key: 'png',
      render: (val,record) => (
        <div>
          <span>{val}</span>
          <img src={ record.img} alt="" width={40} style={{marginLeft:0}}/>
        </div>
      )
    },  {
      title: '商品名称',
      dataIndex: 'goodsName',
      key: 'goodsName',

    },{
      title: '进货价',
      dataIndex: 'goodsCost',
      key: 'goodsCost',
      render:val=>`¥${val}`
    },{
      title: '售价',
      dataIndex: 'goodsPrice',
      key: 'goodsPrice',
      render:val=>`¥${val}`
    },{
      title: '库存',
      dataIndex: 'goodsNum',
      key: 'goodsNum',
    }
    ];

    const props = {
    //  action: getUploadUrl(),
    //  headers: getHeader(),
      showUploadList: false,
      // listType: 'picture',
      // accept:'image/*',
      onChange: this.handleUploadChange,
      multiple: false,
      // customRequest:this.upload,
    };


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

          {/* <Table dataSource={list}
                 // scroll={{ x: 1500}}
                 rowKey={record => record.key}
                 columns={columns}
                 pagination={paginationProps}
                 onChange={this.handleTableChange}
                 // loading={submitting}
          /> */}
          <div style={{marginBottom:'10px'}}>
            <Button type="primary" style={{marginRight:'10px'}} onClick={this.handleDetermine.bind(this)}>确定</Button>
            <Button  onClick={this.handleCancel.bind(this)}>取消</Button>
          </div>
          
          <Table dataSource={list}
            // scroll={{ x: 1500}}
            rowKey={record => record.key}
            columns={columns}
            pagination={paginationProps}
            onChange={this.handleTableChange}
          />
          
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default chooseCommodity;
