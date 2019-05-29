import { stringify } from 'qs';
import request from '@/utils/request';

//const b = 'http://192.168.0.128:53943';
const b = 'http://192.168.191.1:53943';
//import {apiUrl,testUrl} from '@/utils/request';



//获取店员列表
export async function getData(param) {
  //console.log('获取')
  const _token = localStorage.getItem("acbc-token")
  return request(b+'/api/config/GiftManage/Employee', {
    method: 'POST',
    data: {
          token : JSON.parse(_token).token,
          method : "EmployeeLogon", 
          param,
          },
  });
}
// //删除店员
// export async function getDel(param) {
//   console.log('删除')
//   const _token = localStorage.getItem("acbc-token")
//   return request(b+'/api/config/GiftManage/Employee', {
//     method: 'POST',
//     data: {
//           token : JSON.parse(_token).token,
//           method : "DeleteEmployee", 
//           param,
//           },
//   });
// }
