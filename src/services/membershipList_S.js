import { stringify } from 'qs';
import request from '@/utils/request';

// const b = 'http://192.168.0.128:53943';
//const b = 'http://192.168.191.1:53943';
//import {apiUrl,testUrl} from '@/utils/request';
import currency from '../utils/currency.js'

export async function getData(param) {
  return request(currency.GetApiUrl() + '/api/giftmanage/GiftManage/Member', {
    method: 'POST',
    data: {
          token: currency.GetToken(),
          method : "MemberList", 
          param,
          },
  });
}


// export async function getData(param) {
//   const _token = localStorage.getItem("acbc-token")
//   return request(b+'/api/giftmanage/GiftManage/Member', {
//     method: 'POST',
//     data: {
//           token : JSON.parse(_token).token,
//           method : "MemberList", 
//           param,
//           },
//   });
// }


