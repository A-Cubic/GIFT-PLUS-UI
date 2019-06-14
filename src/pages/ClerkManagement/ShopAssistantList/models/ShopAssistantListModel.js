import { queryRule, removeRule, addRule, updateRule } from '@/services/api';
import { getData,getDel} from '@/services/ShopAssistantListModel_S';
import { message } from 'antd';
import { routerRedux } from 'dva/router';


export default {
  namespace: 'ShopAssistantListModel',

  state: {
    dataAll: {
      item:{},
      list: [],
      pagination: {
        current: '1',
        total: 1,
        pageSize: 9
      },
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
    // //删除接口
    // *getDel({ payload ,callback},{ call,put }){
    //   const response = yield call(getDel, payload);
      
    //   if(response!==undefined){
    //     console.log('111777',response.msg.code)
    //     if(response.msg.code == 4000){
    //       yield put(routerRedux.push('/user/login'));
    //       console.log('222777')
    //     } else {
    //       callback(response)
    //       console.log('333777')
    //     }
        
    //   }
    // },

    


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
