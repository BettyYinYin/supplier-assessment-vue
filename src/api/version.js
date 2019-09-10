import request from '../utils/request'
import qs from 'qs'
import Config from '@/config.js';

// 查询所有版本
const findAllVersionList = (params) => {
  return request({
    method: 'get',
    url: Config.API_PREFIX_DD + '/version/findAllVersionList',
    params
  })
}


// 添加版本
const addVersion = (data) => {
  return request({
    method: 'post',
    url: Config.API_PREFIX_DD + '/version/saveVersionInfo',
    data: qs.stringify(data)
  })
}



export default {
  findAllVersionList,
  addVersion
}