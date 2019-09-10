import request from '../utils/request'
import Config from '@/config.js';
import Qs from 'qs'
// supplier-evaluation-audit-server/supplierEvaluation/getSupplierList?param
// 查看所有供应商名称
export const getSupplierList = (params) => {
  return request({
    method: 'get',
    url: `${Config.API_PREFIX_DD}/supplierEvaluation/getSupplierList`,
    params
  })
}

// 查询所有供应商评价列表
// supplier-evaluation-audit-server/supplierEvaluation/getList
export const getList = (params) => {
  return request({
    method: 'get',
    url: `${Config.API_PREFIX_DD}/supplierEvaluation/getList`,
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
    url: `${Config.API_PREFIX_DD}/supplierEvaluation/info`,
    params
  })
}

// supplier-evaluation-audit-server/supplierEvaluation/getContractList 
// 根据供应商id获取合同列表和项目列表
export const getContractList = (params) => {
  return request({
    method: 'get',
    url: `${Config.API_PREFIX_DD}/supplierEvaluation/getContractList`,
    params
  })
}

// supplier-evaluation-audit-server/supplierEvaluation/getOneQuotaList
// 获取一级指标
export const getOneQuotaList = () => {
  return request({
    method: 'get',
    url: `${Config.API_PREFIX_DD}/supplierEvaluation/getOneQuotaList`
  })
}

// supplier-evaluation-audit-server/supplierEvaluation/getTwoQuotaList
// 获取二级指标
export const getTwoQuotaList = (params) => {
  return request({
    method: 'get',
    url: `${Config.API_PREFIX_DD}/supplierEvaluation/getTwoQuotaList`,
    params
  })
}

// supplier-file-server/file/upload
export const upload = (data) => {
  return request({
    method: 'post',
    url: `${Config.API_PREFIX_DD}/file/upload`,
    'content-type': 'multipart/form-data',
    data
  })
}

// supplier-file-server/file/deleteFile
export const deleteFile = (params) => {
  return request({
    method: 'get',
    url: `${Config.API_PREFIX_DD}/file/deleteFile`,
    params
  })
}

// findFileList
export const findFileList = (params) => {
  return request({
    method: 'get',
    url: `${Config.API_PREFIX_DD}/file/findFileList`,
    params: {
      sysCode: 'project',
      businessNode: 'project_supplier',
      ...params
    }
  })
}

// supplier-evaluation-audit-server/supplierEvaluation/save
// 暂存/提交
export const save = (data) => {
  return request({
    method: 'post',
    url: `${Config.API_PREFIX_DD}/supplierEvaluation/save`,
    data: Qs.stringify(data)
  })
}


// supplier-evaluation-audit-server/supplierEvaluation/update
// 撤销/删除接口
export const update = (params) => {
  return request({
    method: 'get',
    url: `${Config.API_PREFIX_DD}/supplierEvaluation/update`,
    params
  })
}