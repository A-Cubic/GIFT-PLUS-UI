import { stringify } from 'qs';
import request from '@/utils/request';
import currency from '../utils/currency.js'


//获取店员列表
export async function getData(param) {
  return request(currency.GetApiUrl() + '/api/giftmanage/GiftManage/Employee', {
    method: 'POST',
    data: {
          token: currency.GetToken(),
          method : "EmployeeLogon", 
          param,
          },
  });
}
// //删除店员
// export async function getDel(param) {
//   console.log('删除')
//   const _token = localStorage.getItem("acbc-token")
//   return request(b+'/api/giftmanage/GiftManage/Employee', {
//     method: 'POST',
//     data: {
//           token : JSON.parse(_token).token,
//           method : "DeleteEmployee", 
//           param,
//           },
//   });
// }
