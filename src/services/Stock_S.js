import { stringify } from 'qs';
import request from '@/utils/request';
import currency from '../utils/currency.js'


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

  return request(currency.GetApiUrl() + '/api/giftmanage/GiftManage/Goods', {
    method: 'POST',
    data: {
          token: currency.GetToken(),
          method : "StockStatistics", 
          param,
          },
  });
}


