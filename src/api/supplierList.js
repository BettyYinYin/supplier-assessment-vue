import request from '../utils/request'
import Config from '@/config.js';

// supplier-evaluation-audit-server/supplierEvaluation/getList
// 查看所有供应商名称
export const getList = (params) => {
  return request({
    method: 'get',
    url: `${Config.API_PREFIX_DD}/supplierEvaluation/getList`,
    params
  })
}