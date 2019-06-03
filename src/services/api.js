import { stringify } from 'qs';
import request from '@/utils/request';
import { setAuthority } from '@/utils/authority';

//const b = 'http://192.168.0.128:53943';
const b = 'http://192.168.191.1:53943';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(param) {
  // return request('/api/login/account', {
  //   method: 'POST',
  //   data: params,
  // });
  return request(b+'/api/giftmanage/GiftManage/user', {
    // method: 'POST',
    // data: params,
    method: 'POST',
    data: {
      param,
     // method: 'post',
     method : "UserLogin", 
    },
  });
}

export async function userLogout(param) {
  const _token = localStorage.getItem("acbc-token")
  
  // return request('/api/login/account', {
  //   method: 'POST',
  //   data: params,
  // });
  return request(b+'/api/giftmanage/GiftManage/user', {
    // method: 'POST',
    // data: params,
    method: 'POST',
    data: {
      //param,
      token : JSON.parse(_token).token,
      param: {
        status: false,
        data: {authority: 'guest'}
      },
     // method: 'post',
     method : "UserLogout", 
    },
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
