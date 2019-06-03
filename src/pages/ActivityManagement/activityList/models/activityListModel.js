import { queryRule, removeRule, addRule, updateRule } from '@/services/api';
import { getData} from '@/services/activityList_S';
import { message } from 'antd';
import { routerRedux } from 'dva/router';


export default {
  namespace: 'activityListModel',

  state: {
    dataAll: {
      item:{},
      list: [],
      pagination: {},
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
