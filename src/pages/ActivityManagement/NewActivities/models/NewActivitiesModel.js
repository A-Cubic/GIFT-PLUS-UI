import { queryRule, removeRule, addRule, updateRule } from '@/services/api';
import { 
  getData 
  ,getSubmit 
  ,getRecordR 
  ,getChooseCommodityData //选择商品
  ,getChoseGoods, //勾选接口，
  getMakeSureGoodsList, //新增活动列表
  getChangeNum, //改数
  getDelR, //删除
  getCelarR, //清理item
  getChooseCancel, //取消
  getHandleOkR, //打开弹窗
  getHandleCR,//关闭
} from '@/services/NewActivities_S';
import { message } from 'antd';
import { routerRedux } from 'dva/router';


export default {
  namespace: 'NewActivitiesModel',

  state: {
    dataAll: {
      item:{
        date:'',
        activeRemark:'',
        activeTime:'',
        activeType:0,
        consume:'',
        heartItemValue:'',
        limitItemValue:'',
      },
      list: [],
      pagination: {},
    },
    chooseCommodity: {
      item:{},
      list: [],
      pagination: {},
    },
    inputVal: {
      item:{
        activeRemark:'',
        activeTime:'',
        activeType:0,
        consume:'',
        heartItemValue:'',
        limitItemValue:'',
      },
    },
    see: {
      popup:false,

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
     // console.log('xxxxx')
      if(response!==undefined){
        if(response.success ===true){
          if(response.msg.code == 4000){
            yield put(routerRedux.push('/user/login'));
          } else {
            
           // message.success(response.msg.msg)
           callback(response)
            
          }
        } else {
         
          //message.error('商品id错误') 
          if(response.msg.code == 7001) {
            message.error('商品id错误') 
          }
          if(response.msg.code == 7002) {
            message.error('商品数量错误') 
          }
          if(response.msg.code == 8001) {
            message.error('活动类型错误') 
          }
          if(response.msg.code == 8002) {
            message.error('填写钱数错误') 
          }
          if(response.msg.code == 8003) {
            message.error('时间错误') 
          }
          if(response.msg.code == 8004) {
            message.error('活动标题错误') 
          }
          if(response.msg.code == 8005) {
            message.error('礼品不能为空') 
          }
          if(response.msg.code == 8006) {
            message.error('状态错误') 
          }
          

        }
        
      }
    },
  
    //选择商品勾选
    *getChoseGoods({ payload,callback },{ call,put }){
      const response = yield call(getChoseGoods, payload);
      //console.log('xxxxxresponse',response)
      if(response!==undefined){
        if(response.success ===true){
          if(response.msg.code == 4000){
            yield put(routerRedux.push('/user/login'));
          } else {
            
           // message.success(response.msg.msg)
          callback(response)
            
          }
        } else {
         // message.error('商品id错误')  
        }
        
        
      }
    },

    //选择商品取消
    *getChooseCancel({ payload,callback },{ call,put }){
      const response = yield call(getChooseCancel, payload);
      //console.log('xxxxxresponse',response)
      if(response!==undefined){
        if(response.success ===true){
          if(response.msg.code == 4000){
            yield put(routerRedux.push('/user/login'));
          } else {
            
           // message.success(response.msg.msg)
          //callback(response)
          yield put(routerRedux.push('/activity/new'));
            
          }
        } else {
          //message.error('商品id错误')  
        }
        
        
      }
    },

    

    //新增活动列表
    *getMakeSureGoodsList({ payload },{ call,put }){
      const response = yield call(getMakeSureGoodsList, payload);
      if(response!==undefined){
        if(response.msg.code == 4000){
        
          yield put(routerRedux.push('/user/login'));
        } else {
          yield put({
            type: 'getMakeSureGoodsListR',
            payload: response,
          })
        }
        
      }
    },

    //改数
    *getChangeNum({ payload },{ call,put }){
      const response = yield call(getChangeNum, payload);
      if(response!==undefined){
       // console.log('xxx',response)
        if(response.msg.code == 4000){
        
          yield put(routerRedux.push('/user/login'));
        } else {
          yield put({
            type: 'getChangeNumR',
            payload: response,
          })
        }
        
      }
    },

  },

  reducers: {
   

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



    getMakeSureGoodsListR(state, action){
    //  console.log('xxx',action.payload)
      return {
        ...state,
        dataAll: {
          // item: {
          //   activeRemark:action.payload.activeRemark,
          //   activeTime:'',
          //   activeType:0,
          //   consume:'',
          //   heartItemValue:'',
          //   limitItemValue:'',
          // },
          item:action.payload.data.item,
          list:action.payload.data.list,
          pagination:action.payload.data.pagination
        }
      }
    },

    //
    getRecordR(state, action){
      //console.log('xxxdata',action.payload)
      return {
        ...state,
        inputVal: {
          item: {
            date:action.payload.date,
            activeRemark:action.payload.activeRemark,
            activeTime:action.payload.activeTime,
            activeType:action.payload.activeType,
            consume:action.payload.consume,
            heartItemValue:action.payload.heartItemValue,
            limitItemValue:action.payload.limitItemValue,
          }
          
        }
      }
    },

    getCelarR(state, action){
    //  console.log('xxxdata',action.payload)
      return {
        ...state,
        inputVal: {
          item:{
            date:'',
            activeRemark:'',
            activeTime:'',
            activeType:0,
            consume:'',
            heartItemValue:'',
            limitItemValue:'',
          },
          
        }
      }
    },

    getDelR(state, action){
      //console.log('xxxxxxxaa',action)
      //console.log('state',state.dataAll.list)
      const inList = state.dataAll.list
      const bb = action.payload.goodsId
      const newData=inList.filter(item => item.goodsId != bb)
      return {
        ...state,
        dataAll: {
          list:newData,
    
        }
      }
    },


    getHandleOkR(state, action){
      return {
        ...state,
        see: {
          popup:true,

        }
      }
    },
    getHandleCR(state, action){
      return {
        ...state,
        see: {
          popup:false,

        }
      }
    },


    // 发货列表-改变采购数量

    getChangeNumR(state, action){
      //console.log('xxxxxaction',action)
       const inList = state.dataAll.list
       const bb = action.payload.data.goodsId
       const dataSource = [...inList]
      


      const b =inList.find(item=>
        item.goodsId===action.payload.data.goodsId
      )
     // console.log('xxxdataSource',dataSource)

      //state.deliveryForm.tableData.item.purchasePrice = action.payload.allPrice



      b.goodsNums =  action.payload.data.goodsNums == null?b.goodsNums:action.payload.data.goodsNums
      // b.goodsNum = action.payload.goodsNum
      // b.safeNum = action.payload.safeNum==null?b.safeNum:action.payload.safeNum
      // const num = action.payload.pNum == null?b.pNum:action.payload.pNum
        
      return {
        ...state,
        dataAll: {
          item:action.payload.data.item,
          list:dataSource,
          //pagination:action.payload.data.pagination
        }
      }
    },


    


    
  },
};
