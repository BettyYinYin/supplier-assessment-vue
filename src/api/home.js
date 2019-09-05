import request from '../utils/request'
import Config from '@/config.js';

// supplier-evaluation-audit-server/supplierEvaluation/getTotalSupplierEvaluate
// 获取首页统计数据
export const getTotalSupplierEvaluate = () => {
  return request({
    method: 'get',
    url: `${Config.API_PREFIX}/supplierEvaluation/getTotalSupplierEvaluate`
  })
}