import { stringify } from 'qs';
import request from '@/utils/request';

// const b = 'http://192.168.0.128:53943';
const b = 'http://192.168.191.1:53943';
//import {apiUrl,testUrl} from '@/utils/request';



//测试接口
// export async function getData(params) {
//   return request('${apiUrl}/llback/AccountFund/GetRetailMoney', {
//     method: 'POST',
//     data: {
//       ...params,
//      // method: 'post',
//     },
//   });
// }

export async function getData(param) {
  const _token = localStorage.getItem("acbc-token")
  return request(b+'/api/config/GiftManage/Goods', {
    method: 'POST',
    data: {
          token : JSON.parse(_token).token,
          method : "StockStatistics", 
          param,
          },
  });
}


