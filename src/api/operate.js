import request from '../utils/request'
import Config from '@/config.js';

// supplier-evaluation-audit-server/supplierEvaluation/getSupplierList?param
// 查看所有供应商名称
export const getSupplierList = (params) => {
  return request({
    method: 'get',
    url: `${Config.API_PREFIX}/supplierEvaluation/getSupplierList`,
    params
  })
}

// 查询所有供应商评价列表
// supplier-evaluation-audit-server/supplierEvaluation/getList
export const getList = (params) => {
  return request({
    method: 'get',
    url: `${Config.API_PREFIX}/supplierEvaluation/getList`,
    params
  })
}

// quotaMaintain/getList
export const getQuotaMaintainList = (params) => {
  return request({
    method: 'get',
    url: `${Config.API_PREFIX_DD}/quotaMaintain/getList`,
    params
  })
}


// supplier-evaluation-audit-server/supplierEvaluation/info
// 查看或编辑
export const info = (params) => {
  return request({
    method: 'get',
    url: `${Config.API_PREFIX}/supplierEvaluation/info`,
    params
  })
}