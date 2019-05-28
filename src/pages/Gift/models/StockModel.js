import { queryRule, removeRule, addRule, updateRule } from '@/services/api';
import { getData} from '@/services/Stock_S';
import { message } from 'antd';



export default {
  namespace: 'StockModel',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    //测试接口
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
        data:action.payload
      }
    },








    
  },
};
