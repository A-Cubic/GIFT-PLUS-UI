import React, { PureComponent }  from 'react';
import { message,Row, Col, Form,Input,DatePicker,Select,Button,Card,InputNumber, Radio,Icon,Tooltip} from 'antd';
import GGEditor, { Mind } from 'gg-editor';
// import EditorMinimap from '../components/EditorMinimap';
// import { MindContextMenu } from '../components/EditorContextMenu';
// import { MindToolbar } from '../components/EditorToolbar';
// import { MindDetailPanel } from '../components/EditorDetailPanel';
// import data from '../mock/worldCup2018.json';
// import styles from '../Flow/index.less';
import { FormattedMessage } from 'umi-plugin-react/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
GGEditor.setTrackable(false);

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;



@connect(({ loading ,ClerkRegistrationModel}) => ({
  submitting: loading.effects['form/submitRegularForm'],
  ClerkRegistrationModel
}))
@Form.create()
class orderList extends PureComponent {

  state = { 
    storeCode:'',
    state:''
  };

  componentDidMount() {
    this.init()
  }

  init(){
    
    this.props.dispatch({
      type: 'ClerkRegistrationModel/getClerk',
      payload: {
       
      },
    });
  }






  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'ClerkRegistrationModel/getData',
          payload: values,
          callback: this.callbackType,
        });

      }
    });
  };

  callbackType = (params) => {
    // console.log('callbackType',params.data.msg)
    // console.log('params',params.success)
    if(params.success == true){
      message.success('注册成功')
      this.handleFormReset()
      this.init()
    } else {
      message.error(params.data.msg);
    }
  }  
  
  handleFormReset =()=>{
    this.props.form.resetFields();
    
  }

  
  

  render() {
    const {ClerkRegistrationModel:{dataAll:{item}}} = this.props;

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

    return (
      <PageHeaderWrapper
        title='店员注册'
       
      >
        <Card bordered={false}>
          <div style={{textAlign:'center',fontSize:'18px',marginBottom:'10px'}}>原验证码：{item.storeCode}</div>
          <div style={{textAlign:'center',fontSize:'18px',marginBottom:'10px'}}>原可注册数量：{item.state}</div>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label='验证码'>
              {getFieldDecorator('storeCode', {
                rules: [{ required: true, message: '请输入四位手机验证码' }],
              })(<Input placeholder="请输入四位手机验证码"/>)}
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
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default orderList;
