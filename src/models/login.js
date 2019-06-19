import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, getFakeCaptcha,userLogout } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { message } from 'antd';


export default {
  namespace: 'login',

  state: {
    status: undefined,
    currentUser: {},
  },

  effects: {
    *login({ payload ,callback}, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
     // console.log('xxx',response)
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      // if (response.status === 'ok') {
      //   reloadAuthorized();
      //   const urlParams = new URL(window.location.href);
      //   const params = getPageQuery();
      //   let { redirect } = params;
      //   if (redirect) {
      //     const redirectUrlParams = new URL(redirect);
      //     if (redirectUrlParams.origin === urlParams.origin) {
      //       redirect = redirect.substr(urlParams.origin.length);
      //       if (redirect.match(/^\/.*#/)) {
      //         redirect = redirect.substr(redirect.indexOf('#') + 1);
      //       }
      //     } else {
      //       redirect = null;
      //     }
      //   }
      //   callback(response)
      //   yield put(routerRedux.replace(redirect || '/'));
      // }
      
      // if (response.data.isonload === true) {
      if (response.success === true) {  
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            redirect = null;
      
          }
        }
        //callback(response)
        yield put(routerRedux.replace(redirect || '/gift/stock'));
      } else {
        message.error('用户名或密码错误');
      }


    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    // *logout(_, { put }) {
    *logout({ payload ,callback}, { call, put }) {
      const response = yield call(userLogout, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          data: {authority: 'guest'}
        },
      });
    

      reloadAuthorized();
      // redirect
      if (window.location.pathname !== '/user/login') {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        );
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      // if(payload.data.isonload == true){
      if(payload.success == true){  
        localStorage.setItem('acbc-token',JSON.stringify(payload.data))
      } else{
        localStorage.setItem('acbc-token','')
      }
      setAuthority(payload.data==null?'':payload.data.authority);
      //setAuthority(payload.msg.msg);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
