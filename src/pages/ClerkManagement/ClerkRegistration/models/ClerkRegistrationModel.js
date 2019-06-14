import { queryRule, removeRule, addRule, updateRule } from '@/services/api';
import { getData ,getClerk,} from '@/services/ClerkRegistrationl_S';
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
    // *getData({ payload,callback },{ call,put }){
      
    //   const response = yield call(getData, payload);
    //   if(response!==undefined){
    //     if(response.msg.code == 4000){
    //       yield put(routerRedux.push('/user/login'));
    //     } else {
          
         
    //       callback(response)
          
    //     }
        
    //   }
    // },

    *getData({ payload,callback },{ call,put }){
      const response = yield call(getData, payload);
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
          if(response.msg.code == 6000) {
            message.error('验证码错误') 
          }
          if(response.msg.code == 6001) {
            message.error('验证码重复') 
          }
          if(response.msg.code == 6002) {
            message.error('错误注册数量') 
          }
          if(response.msg.code == 500) {
            message.error('数据有误，请联系客服') 
          }
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
