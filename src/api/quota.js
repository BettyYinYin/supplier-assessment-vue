import request from '../utils/request'
import Config from '@/config.js';

// supplier-evaluation-audit-server/supplierEvaluation/getQuotaList
// 获取指标详情
export const getAllQuotaList = () => {
  return request({
    method: 'get',
    url: `${Config.API_PREFIX_DD}/supplierEvaluation/getAllQuotaList`
  })
}
