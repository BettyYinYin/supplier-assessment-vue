import request from '../utils/request'
import qs from 'query-string'

// 查询所有版本
const findAllVersionList = (params) => {
  return request({
    method: 'get',
    url: 'version/findAllVersionList',
    params
  })
}


// 添加版本
const addVersion = (data) => {
  return request({
    method: 'post',
    url: 'version/saveVersionInfo',
    data: qs.stringify(data)
  })
}



export default {
  findAllVersionList,
  addVersion
}