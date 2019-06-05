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
//选择商品勾选
export async function getChoseGoods(param) {
  return request(currency.GetApiUrl() + '/api/giftmanage/GiftManage/Active', {
    method: 'POST',
    data: {
          token: currency.GetToken(),
          method : "ChoseGoods", 
          param,
          },
  });
}


//新增活动列表
export async function getMakeSureGoodsList(param) {
  return request(currency.GetApiUrl() + '/api/giftmanage/GiftManage/Active', {
    method: 'POST',
    data: {
          token: currency.GetToken(),
          method : "MakeSureGoodsList", 
          param,
          },
  });
}

//改数
export async function getChangeNum(param) {
  return request(currency.GetApiUrl() + '/api/giftmanage/GiftManage/Active', {
    method: 'POST',
    data: {
          token: currency.GetToken(),
          method : "ChangeGoodsNum", 
          param,
          },
  });
}

//取消
export async function getChooseCancel(param) {
  return request(currency.GetApiUrl() + '/api/giftmanage/GiftManage/Active', {
    method: 'POST',
    data: {
          token: currency.GetToken(),
          method : "DeleteActiveGoods", 
          param,
          },
  });
}