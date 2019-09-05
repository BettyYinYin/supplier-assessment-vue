import request from '../utils/request'
import Config from '@/config.js';

// supplier-evaluation-audit-server/supplierEvaluation/add
export const fetchInitial = () => {
  return request({
    method: 'get',
    url: `${Config.API_PREFIX}/supplierEvaluation/add`
  })
}