import { queryRule, removeRule, addRule, updateRule } from '@/services/api';
import { getData ,getClerk} from '@/services/ClerkRegistrationl_S';
import { message } from 'antd';
import { routerRedux } from 'dva/router';


export default {
  namespace: 'ClerkRegistrationModel',

  state: {
    dataAll: {
      item:{},
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


    *getClerk({ payload },{ call,put }){
      const response = yield call(getClerk, payload);
      if(response!==undefined){
        if(response.msg.code == 4000){
          yield put(routerRedux.push('/user/login'));
        } else {
          yield put({
            type: 'getClerkR',
            payload: response,
          })
        }
        
      }
    },
  

    


  },

  reducers: {
    getClerkR(state, action){
      return {
        ...state,
        dataAll: {
          item:action.payload.data,
          list:action.payload.data.list,
          pagination:action.payload.data.pagination
        }
      }
    },








    
  },
};
