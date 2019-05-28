import { queryRule, removeRule, addRule, updateRule } from '@/services/api';
import { getData} from '@/services/Stock_S';
import { message } from 'antd';



export default {
  namespace: '1111StockModel',

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
      //console.log('~payload',payload)
      if(response!==undefined){
        //console.log('~response',response)
        yield put({
          type: 'getDataR',
          payload: response,
        })
      }
    },




  },

  reducers: {
  
    getDataR(state, action){
      console.log('state',state,)
      console.log('action',action,)
      return {
        ...state,
        data:action.payload
      }
    },








    
  },
};
