import { query as queryUsers, queryCurrent } from '@/services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      //const response = yield call(queryCurrent);
      // console.log('localStorage.getItem("acbc-token")',localStorage.getItem("acbc-token"))
      // console.log('xxxxresponse',response)
      yield put({
        type: 'saveCurrentUser',
        //payload: '',
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      const name = JSON.parse(localStorage.getItem("acbc-token"))
      // console.log('xxxaction.payload',action.payload)
      // console.log('name.getItem("acbc-token")',name )
      return {
        ...state,
       // currentUser: action.payload || {},
      currentUser: name || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
