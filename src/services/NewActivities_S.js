import { stringify } from 'qs';
import request from '@/utils/request';
import currency from '../utils/currency.js'

//提交新增活动
export async function getSubmit(param) {
  //console.log(currency.GetApiUrl())
  return request(currency.GetApiUrl() + '/api/giftmanage/GiftManage/Active', {
    method: 'POST',
    data: {
          token: currency.GetToken(),
          method : "AddActive", 
          param,
          },
  });
}

//获取选择商品接口 
export async function getChooseCommodityData(param) {
  return request(currency.GetApiUrl() + '/api/giftmanage/GiftManage/Active', {
    method: 'POST',
    data: {
          token: currency.GetToken(),
          method : "GoodsList", 
          param,
          },
  });
}
