import { stringify } from 'qs';
import request from '@/utils/request';
import currency from '../utils/currency.js'


export async function getData(param) {
  return request(currency.GetApiUrl() + '/api/giftmanage/GiftManage/Order', {
    method: 'POST',
    data: {
          token: currency.GetToken(),
          method : "OrderList", 
          param,
          },
  });
}

export async function getOpen(param) {
  return request(currency.GetApiUrl() + '/api/giftmanage/GiftManage/Order', {
    method: 'POST',
    data: {
          token: currency.GetToken(),
          method : "OrderDetails", 
          param,
          },
  });
}

