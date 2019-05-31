import { stringify } from 'qs';
import request from '@/utils/request';

//const b = 'http://192.168.0.128:53943';
const b = 'http://192.168.191.1:53943';
//import {apiUrl,testUrl} from '@/utils/request';



//提交注册店员
export async function getData(param) {
  //console.log('获取')
  const _token = localStorage.getItem("acbc-token")
  return request(b+'/api/config/GiftManage/Employee', {
    method: 'POST',
    data: {
          token : JSON.parse(_token).token,
          method : "AddEmployee", 
          param,
          },
  });
}

//获取验证码
export async function getClerk(param) {
  //console.log('获取')
  const _token = localStorage.getItem("acbc-token")
  return request(b+'/api/config/GiftManage/Employee', {
    method: 'POST',
    data: {
          token : JSON.parse(_token).token,
          method : "CheckOldStoreCode", 
          param,
          },
  });
}