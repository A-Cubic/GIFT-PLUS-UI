import React, { PureComponent }  from 'react';
import {Table ,Divider , message,Row, Col, Form,Input,DatePicker,Select,Button,Card,InputNumber, Radio,Icon,Tooltip} from 'antd';
import GGEditor, { Mind } from 'gg-editor';
// import EditorMinimap from '../components/EditorMinimap';
// import { MindContextMenu } from '../components/EditorContextMenu';
// import { MindToolbar } from '../components/EditorToolbar';
// import { MindDetailPanel } from '../components/EditorDetailPanel';
// import data from '../mock/worldCup2018.json';
import styles from '../membershipList/index.less';
import { FormattedMessage } from 'umi-plugin-react/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
GGEditor.setTrackable(false);

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;



@connect(({ loading ,membershipListModel}) => ({
  submitting: loading.effects['form/submitRegularForm'],
  membershipListModel
}))
@Form.create()
class membershipList extends PureComponent {

  state = { 
    storeCode:'',
    state:'',
    formValues:{},
    visible: false,
    visibleChildCheck:false,
    pagination:{}
  };

  componentDidMount() {
    this.init()
    
  }

  init(){
    this.props.dispatch({
      type: 'membershipListModel/getData',
      payload: {
        
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
        type: 'membershipListModel/getData',
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
    console.log('pagination',pagination)
    const params = {
      ...pagination,
      ...this.state.formValues,
    };
    this.props.dispatch({
      type: 'membershipListModel/getData',
      payload: params,
    });
  }

 
  handleVisible = (flag,who) => {
    this.setState({
      visibleChildCheck:!!flag,
    });
  }



  


  renderForm(){
  //const { roleOperationDistribution:{storesSales:{tableData:{item}}} } = this.props;
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
            <FormItem label="姓名：">
              {getFieldDecorator('userName')(
                <Input style={{ width: '100%' }} placeholder="请输入姓名" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="性别">
              {getFieldDecorator('sex')(
                 <Select  placeholder="请选择性别">
                  <Option value="男">男</Option>
                  <Option value="女">女</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24} >
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
    const { membershipListModel:{dataAll:{item,list,pagination}} } = this.props;
    //console.log('777',list)

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
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '图片',
        dataIndex: 'state',
        key: 'state',
        render: (val,record) => (
          <div>
            <span>{val}</span>
            <img src={ record.img} alt="" width={35} style={{marginLeft:0}}/>
          </div>
        )
      } 
      , {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
      }
      , {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      }
      
    ];

    return (
      <PageHeaderWrapper
        title='会员列表'
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

export default membershipList;
