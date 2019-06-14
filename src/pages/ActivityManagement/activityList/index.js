import React, { PureComponent } from 'react';
import numeral from 'numeral';
import { connect } from 'dva';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { Row, Col, Form, Card, Select, Icon, Avatar, List, Tooltip, Dropdown, Menu } from 'antd';
import TagSelect from '@/components/TagSelect';
import StandardFormRow from '@/components/StandardFormRow';

import { formatWan } from '@/utils/utils';

import styles from './index.less';

const { Option } = Select;
const FormItem = Form.Item;

@connect(({ list, loading ,activityListModel}) => ({
  list,
  loading: loading.models.list,
  activityListModel
}))
@Form.create({
  onValuesChange({ dispatch }, changedValues, allValues) {
    // 表单项变化时请求数据
    // eslint-disable-next-line
   // console.log(changedValues, allValues);
    // 模拟查询表单生效
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
  },
})
class activityList extends PureComponent {
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
      type: 'activityListModel/getData',
      payload: {
        
      },
    });
  }

  handleStart(e,item){
    const { activityListModel:{dataAll:{pagination,list}} } = this.props;
    
   // console.log('pagination',pagination)
    this.props.dispatch({
      type: 'activityListModel/getType',
      payload: {
        activeId:item.activeId,
        operation:'开始',
        current: pagination.current,
        pageSize: pagination.pageSize,
        
      },
      callback: this.callbackType,
    });
   
  }
  

  handleSuspend (e,item){
    const { activityListModel:{dataAll:{pagination,list}} } = this.props;
    this.props.dispatch({
      type: 'activityListModel/getType',
      payload: {
        activeId:item.activeId,
        operation:'暂停',
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
      callback: this.callbackType,
    });
  }  
  handleStop (e,item){
    const { activityListModel:{dataAll:{pagination,list}} } = this.props;
    this.props.dispatch({
      type: 'activityListModel/getType',
      payload: {
        activeId:item.activeId,
        operation:'结束',
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
      callback: this.callbackType,
    });
  }  

  callbackType = (params) => {
    const { activityListModel:{dataAll:{pagination,list}} } = this.props;
    if(params.success == true){
     // message.success('注册成功')
      
     this.props.dispatch({
      type: 'activityListModel/getData',
      payload: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
      //console.log('ok')
    } else {
      message.error(params.data.msg);
    }
  }

  render() {
    const { activityListModel:{dataAll:{item,pagination,list}} } = this.props;
   // console.log(777,pagination)
    // const {
    //   list: { list },
    //   loading,
    //   form,
    // } = this.props;


   // const { getFieldDecorator } = form;

    const CardInfo = ({ activeUser, newUser,activeType, consumeNum,drainage }) => (
      <div className={styles.cardInfo}>
        <div>
          <p>消费</p>
          <p>{consumeNum}</p>
        </div>
        <div>
          <p>引流</p>
          <p>{drainage}</p>
        </div>
        <div>
          <p>拓客</p>
          <p>{newUser}</p>
        </div>
      </div>
    );



    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const actionsTextMap = {
      expandText: <FormattedMessage id="component.tagSelect.expand" defaultMessage="Expand" />,
      collapseText: (
        <FormattedMessage id="component.tagSelect.collapse" defaultMessage="Collapse" />
      ),
      selectAllText: <FormattedMessage id="component.tagSelect.all" defaultMessage="All" />,
    };

    const itemMenu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="https://www.alipay.com/">
            1st menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="https://www.taobao.com/">
            2nd menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="https://www.tmall.com/">
            3d menu item
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className={styles.filterCardList}>
        <List
          rowKey="id"
          style={{ marginTop: 24 }}
          grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
         // loading={loading}
          dataSource={list}
          pagination={{
                

            onChange: (page) => {
              this.props.dispatch({
                type: 'activityListModel/getData',
                payload: {
                  current:page,
                  pageSize:pagination.pageSize,
          
                },
              });
            },
            onShowSizeChange: (current, pageSize) => {
             // console.log('999')
              this.props.dispatch({
                type: 'activityListModel/getData',
                payload: {
                  pageSize:pageSize,
                  current:pagination.page,
               
                },
              });

  
            },
            //pageSize:pagination.pageSize,
            pageSizeOptions:['12', '24', '36', '48'],
            pageSize:pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
            showQuickJumper: true,
          }}

          renderItem={(item ,index )=> (
            <List.Item key={item.id}>
              <Card
                hoverable
                bodyStyle={{ paddingBottom: 20 }}
                actions={[
                  <Tooltip title="开始" onClick={(e) => this.handleStart(e, item,index)}>
                    {item.activeType==1?<Icon type="play-circle" theme="twoTone" twoToneColor="red" />:<Icon type="play-circle" theme="twoTone"  />}
                  </Tooltip>,
                  <Tooltip title="暂停" onClick={(e) => this.handleSuspend(e, item,index)}>
                    {item.activeType==0?<Icon type="pause-circle" theme="twoTone" twoToneColor="red" />:<Icon type="pause-circle" theme="twoTone"  />}
                    {/* <Icon type="pause-circle" theme="twoTone"  /> */}
                  </Tooltip>,
                  <Tooltip title="结束" onClick={(e) => this.handleStop(e, item,index)}>
                    {item.activeType==-1?<Icon type="stop" theme="twoTone" twoToneColor="red" />:<Icon type="stop" theme="twoTone"  />}
                    {/* <Icon type="stop" theme="twoTone"  /> */}
                  </Tooltip>,
                  // <Dropdown overlay={itemMenu}>
                  //   <Icon type="ellipsis" />
                  // </Dropdown>,
                ]}
              >
                {/* <Card.Meta avatar={<Avatar size="small" src={item.img[0]} />} title={item.title} /> */}
              <Card.Meta   />
                {
                  item.img.map((item,index) =>
                  (
                    <span
                      key={index}
                    >
                      <img style={{ width:'20px',margin:'0 7px 0 0 '}} src={item} alt="" />
                    </span>
                  ))
                  
                }
                <div className={styles.nav} style={{marginTop:'7px'}}>{item.title}</div>

                <div className={styles.cardItemContent}>
                  <CardInfo

                    // activeUser={formatWan(item.activeUser)}
                    // newUser={numeral(item.newUser).format('0,0')}
                    consumeNum= {item.consumeNum}
                    drainage = {item.drainage}
                    newUser = {item.newUser}
                  />
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default activityList;
