import React, { PureComponent } from 'react';
import { Row, Col,Card, Button, Icon, List } from 'antd';
import GGEditor, { Flow } from 'gg-editor';
// import EditorMinimap from '../components/EditorMinimap';
// import { FlowContextMenu } from '../components/EditorContextMenu';
// import { FlowToolbar } from '../components/EditorToolbar';
// import { FlowItemPanel } from '../components/EditorItemPanel';
// import { FlowDetailPanel } from '../components/EditorDetailPanel';
import styles from './index.less';
import { FormattedMessage } from 'umi-plugin-react/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import { connect } from 'dva';
import Ellipsis from '@/components/Ellipsis';

GGEditor.setTrackable(false);


@connect(({ list, loading ,ShopAssistantListModel }) => ({
  list,
  loading: loading.models.list,
  ShopAssistantListModel
}))
class FlowPage extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    // dispatch({
    //   type: 'list/fetch',
    //   payload: {
    //     count: 8,
    //   },
    // });
    this.init()
  }

  init(){
    this.props.dispatch({
      type: 'ShopAssistantListModel/getData',
      payload: {
       
      },
    });
  }
  
  render() {
    const {ShopAssistantListModel:{dataAll:{item,pagination,list}}} = this.props;
    //console.log(888,pagination)
    // const {
    //   list: { list },
    //   loading,
    // } = this.props;

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
        <div className={styles.cardList}>
          <List
            rowKey="id"
           // loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={list}
            pagination={{
      
              onChange: (page) => {
                this.props.dispatch({
                  type: 'ShopAssistantListModel/getData',
                  payload: {
                    page:page,
                    pageSize:pagination.pageSize,
            
                  },
                });
              },
              onShowSizeChange: (current, pageSize) => {
               // console.log('999')
                this.props.dispatch({
                  type: 'ShopAssistantListModel/getData',
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
              pageSizeOptions:['9', '18', '27', '36']
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