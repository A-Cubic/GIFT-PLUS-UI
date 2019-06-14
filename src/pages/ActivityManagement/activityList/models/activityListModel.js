import { queryRule, removeRule, addRule, updateRule } from '@/services/api';
import { getData ,getType} from '@/services/activityList_S';
import { message } from 'antd';
import { routerRedux } from 'dva/router';


export default {
  namespace: 'activityListModel',

  state: {
    dataAll: {
      item:{},
      list: [],
      pagination: {
        current: '1',
        total: 1,
        pageSize: 12
      },
    },
  },

  effects: {
    // 活动列表
    *getData({ payload },{ call,put }){
      const response = yield call(getData, payload);
      if(response!==undefined){
        if(response.msg.code == 4000){
        
          yield put(routerRedux.push('/user/login'));
        } else {
          yield put({
            type: 'getDataR',
            payload: response,
          })
        }
        
      }
    },
  
    //点击状态 
    *getType({ payload,callback },{ call,put }){
      const response = yield call(getType, payload);
     // console.log('xxxxx')
      if(response!==undefined){
       // console.log('response.success',response.success)
        if(response.success ===true){
          if(response.msg.code == 4000){
            yield put(routerRedux.push('/user/login'));
          } else {
            
           // message.success(response.msg.msg)
           callback(response)
            
          }
        } else {
         
          //message.error('商品id错误') 
          if(response.msg.code == 8007) {
            message.error('活动单号错误') 
          }
          if(response.msg.code == 8008) {
            message.error('活动操作错误') 
          }
          if(response.msg.code == 8009) {
            message.error('活动已结束，无法操作') 
          }
          if(response.msg.code == 500) {
            message.error('数据有误，请联系客服') 
          }
          
          callback(response)

        }
        
      }
    },
    


  },

  reducers: {
    getDataR(state, action){
      return {
        ...state,
        dataAll: {
          item:action.payload.data.item,
          list:action.payload.data.list,
          pagination:action.payload.data.pagination
        }
      }
    },








    
  },
};
