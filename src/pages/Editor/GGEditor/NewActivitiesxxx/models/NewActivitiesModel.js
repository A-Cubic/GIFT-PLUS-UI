import { queryRule, removeRule, addRule, updateRule } from '@/services/api';
import { getData ,getSubmit} from '@/services/NewActivities_S';
import { message } from 'antd';
import { routerRedux } from 'dva/router';


export default {
  namespace: 'NewActivitiesModel',

  state: {
    dataAll: {
      item:{
        activeType:'',
        
      },
      list: [],
      pagination: {},
    },
  },

  effects: {
    // 店员注册
    *getData({ payload,callback },{ call,put }){
      
      const response = yield call(getData, payload);
      if(response!==undefined){
        if(response.msg.code == 4000){
          yield put(routerRedux.push('/user/login'));
        } else {
          callback(response)
        }
        
      }
    },

    // 提交新怎活动
    *getSubmit({ payload,callback },{ call,put }){
      const response = yield call(getSubmit, payload);
      console.log('xxxxx')
      if(response!==undefined){
        if(response.msg.code == 4000){
          yield put(routerRedux.push('/user/login'));
        } else {
          
         
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
