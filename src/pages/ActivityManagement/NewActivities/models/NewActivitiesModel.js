import { queryRule, removeRule, addRule, updateRule } from '@/services/api';
import { getData ,getSubmit ,getRecordR ,getChooseCommodityData} from '@/services/NewActivities_S';
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
    chooseCommodity: {
      item:{},
      list: [],
      pagination: {},
    }
  },

  effects: {
    // 获取接口
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


    //获取选择商品
    *getChooseCommodityData({ payload },{ call,put }){
      const response = yield call(getChooseCommodityData, payload);
      if(response!==undefined){
        if(response.msg.code == 4000){
        
          yield put(routerRedux.push('/user/login'));
        } else {
          yield put({
            type: 'getChooseCommodityDataR',
            payload: response,
          })
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

    getChooseCommodityDataR(state, action){
      return {
        ...state,
        chooseCommodity: {
          item:action.payload.data.item,
          list:action.payload.data.list,
          pagination:action.payload.data.pagination
        }
      }
    },



    getRecordR(state, action){
      console.log('action',action)


      return {
        ...state,
        dataAll: {
          item:action.payload
        
        }
      }
    },








    
  },
};
