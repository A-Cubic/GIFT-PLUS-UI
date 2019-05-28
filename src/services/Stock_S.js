import { stringify } from 'qs';
import request from '@/utils/request';

const b = 'http://192.168.0.128:53943';
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

export async function getData(params) {
  return request(b+'/api/config/GiftManage/Goods', {
    method: 'POST',
    data: {
          token : "18388e98e8f90884a3f54f0cf3a5bd2e",
          method : "StockStatistics", 
          params,
          },
  });
}


