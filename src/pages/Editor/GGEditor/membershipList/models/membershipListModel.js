import { queryRule, removeRule, addRule, updateRule } from '@/services/api';
import { getData} from '@/services/membershipList_S.js';
import { message } from 'antd';
import { routerRedux } from 'dva/router';


export default {
  namespace: 'membershipListModel',

  state: {
    dataAll: {
      item:{},
      list: [],
      pagination: {},
    },
  },

  effects: {
    //获取接口
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
