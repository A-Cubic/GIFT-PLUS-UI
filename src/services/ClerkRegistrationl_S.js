import { stringify } from 'qs';
import request from '@/utils/request';
import currency from '../utils/currency.js'


//提交注册店员
export async function getData(param) {
  return request(currency.GetApiUrl() + '/api/giftmanage/GiftManage/Employee', {
    method: 'POST',
    data: {
          token: currency.GetToken(),
          method : "AddEmployee", 
          param,
          },
  });

}

//获取验证码
export async function getClerk(param) {
  return request(currency.GetApiUrl() + '/api/giftmanage/GiftManage/Employee', {
    method: 'POST',
    data: {
          token: currency.GetToken(),
          method : "CheckOldStoreCode", 
          param,
          },
  });
}