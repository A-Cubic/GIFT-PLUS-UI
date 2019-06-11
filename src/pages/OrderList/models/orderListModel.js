import { queryRule, removeRule, addRule, updateRule } from '@/services/api';
import { getData ,getOpen ,getHandleR} from '@/services/orderLis_s.js';
import { message } from 'antd';
import { routerRedux } from 'dva/router';


export default {
  namespace: 'orderListModel',

  state: {
    dataAll: {
      item:{},
      list: [],
      pagination: {},
      popup:false,
    },
    orderListSee: {
      popup:false,
      item:{},
      list: [],
      pagination: {},
      code:''
    }
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
    //点击详情
    *getOpen({ payload },{ call,put }){
      const response = yield call(getOpen, payload);
      if(response!==undefined){
        if(response.msg.code == 4000){
        
          yield put(routerRedux.push('/user/login'));
        } else {
          yield put({
            type: 'getOpenR',
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
          pagination:action.payload.data.pagination,
          popup:false
        }
      }
    },

    getOpenR(state, action){

      return {
        ...state,
        orderListSee: {
          item:action.payload.data.item,
          list:action.payload.data.list,
          pagination:action.payload.data.pagination,
          popup:true,
        }
      }
    },

    getHandleR(state, action){
      return {
        ...state,
        orderListSee: {
          item:state.orderListSee.item,
          list:state.orderListSee.list,
          pagination:state.orderListSee.pagination,
          popup:false,
        }
      }
    },





    
  },
};
