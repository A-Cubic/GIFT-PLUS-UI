import { stringify } from 'qs';
import request from '@/utils/request';

//const b = 'http://192.168.0.128:53943';
const b = 'http://192.168.191.1:53943';
//import {apiUrl,testUrl} from '@/utils/request';



//提交新怎活动
export async function getSubmit(param) {
  //console.log('获取')
  const _token = localStorage.getItem("acbc-token")
  return request(b+'/api/config/GiftManage/Active', {
    method: 'POST',
    data: {
          token : JSON.parse(_token).token,
          method : "AddActive", 
          param,
          },
  });
}
