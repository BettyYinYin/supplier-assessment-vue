<template>
  <div>
    <div class="form-item">
      <span class="label">供应商名称</span>
      <span class="grey-color select-zone">
        <span>{{checkForm.supplierName}}</span>
      </span>
    </div>
    <div class="form-item">
      <span class="label">项目名称</span>
      <span class="grey-color select-zone">
        <span>{{checkForm.projectName}}</span>
      </span>
    </div>
    <div class="form-item">
      <span class="label">合同名称</span>
      <span class="grey-color select-zone">
        <span>{{checkForm.contractName}}</span>
      </span>
    </div>
    <div class="form-item">
      <span class="label">项目负责人</span>
      <span class="grey-color select-zone">{{checkForm.leader}}</span>
    </div>
    <div class="title">指标详情</div>
    <div class="form-item">
      <span class="label">一级指标</span>
      <span class="grey-color select-zone">
        <span>{{checkForm.oneQuotaName}}</span>
      </span>
    </div>
    <div class="form-item">
      <span class="label">二级指标</span>
      <span class="grey-color select-zone">
        <span>{{checkForm.twoQuotaName}}</span>
      </span>
    </div>
    <div class="form-item">
      <span class="label">分值</span>
      <span
        class="grey-color select-zone"
      >{{checkForm.quotaScore | formatQuotaScore( checkForm.quotaType)}}</span>
    </div>
    <div class="form-item form-item-input">
      <span class="label">问题描述</span>
      <span class="grey-color select-zone">{{checkForm.problemDescript}}</span>
    </div>
    <div class="form-item form-item-input">
      <span class="label">建议处理措施</span>
      <span class="grey-color select-zone">{{checkForm.treatmentMeasure}}</span>
    </div>
    <div class="form-item upload-btn-wrap">
      <span class="label">佐证材料</span>
      <div>
        <div
          v-for="file in remoteFileList"
          class="file-item"
          @click="download(file)"
          :key="file.id"
        >{{file.oldFileName}}</div>
      </div>
    </div>
    <div class="form-item form-item-input">
      <span class="label">审核信息</span>
      <span class="grey-color select-zone">{{checkForm.auditReason}}</span>
    </div>
    <div class="operate-btn">
      <mt-button size="small" type="primary" @click="cancel">撤销</mt-button>
      <mt-button size="small" type="primary" @click="isAudit = true">审核</mt-button>
    </div>

    <mt-popup v-model="isAudit" :closeOnClickModal="false" class="select-supplier">
      <div class="title">
        审核
      </div>
      <div class="label"><span class="required-index">*</span>审核意见</div>
      <textarea
        class="textarea"
        cols="30"
        rows="3"
        v-model="reason"
        placeholder="请填写审核意见"
      ></textarea>
      <div>
        
      </div>
    </mt-popup>
    
  </div>
</template>

<script>
import { setTitle, showPreloader, hidePreloader } from "@/utils";
import { info } from "@/api/operate.js";
import BScroll from "better-scroll";
import { findFileList, update } from "@/api/operate.js";
import Config from "@/config.js";
export default {
  data() {
    return {
      checkForm: {
        supplierId: "",
        supplierName: "",
        projectId: "",
        projectName: "",
        contractId: "",
        contractName: "",
        leader: "",
        oneQuotaId: "",
        oneQuotaName: "",
        twoQuotaId: "",
        twoQuotaName: "",
        quotaScore: "",
        quotaType: "",
        problemDescript: "",
        treatmentMeasure: "",
        auditReason: ''
      },
      id: "",
      remoteFileList: [],
      evaluateState: '',
      isAudit: false,
      reason: ''
    };
  },
  created() {
    const {id, evaluateState} = this.$route.query
    this.id = id
    this.evaluateState = evaluateState
    this.info();
    setTitle("查看");
    this.findFileList();
  },
  methods: {
    info() {
      showPreloader();
      info({
        id: this.id
      })
        .then(res => {
          this.checkForm = res.data;
        })
        .catch(err => {}).finally(() => {
          hidePreloader()
        });
    },
    findFileList() {
      findFileList({
        businessId: this.id
      })
        .then(res => {
          this.remoteFileList = res.data;
        })
        .catch(err => {
          this.$toast({
            message: "获取文件列表失败",
            duration: 2000
          });
        });
    },
    download(file) {
      window.open(`${Config.API_FILE_SERVER}/file/download?fileId=${file.id}`);
    },
    cancel() {
      update({
        id: this.id,
        evaluateState: this.evaluateState
      }).then(() => {
        this.$toast({
          message: '撤销成功',
          duration: 2000
        })
      }).catch(err => {
        this.$toast({
          message: err.message || '撤销失败',
          duration: 2000
        })
      })
    },
    audit() {

    }
  }
};
</script>  

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.form-item {
  display: flex;
  font-size: 0.9rem;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0.5rem;
  .select-zone {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    word-break: break-all;
    .svg-icon {
      flex: 0 0 0.9rem;
    }
  }
  .label {
    flex: 0 0 5.5rem;
  }
  

  &.form-item-input {
    align-items: flex-start;
  }

  &.upload-btn-wrap {
    justify-content: flex-start;
    .file-item {
      line-height: 1.4rem;
      font-size: 0.8rem;
      color: $color-primary;
    }
    .upload-btn {
      color: $color-primary;
      margin-right: 0.5rem;
    }
  }
}

.title {
  font-size: 0.85rem;
  padding: 0.5rem;
}

.operate-btn {
  text-align: center;
  margin: 2rem 0;
  .mint-button:not(first-child) {
    margin-left: 1rem;
  }

  .mint-button {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

.select-supplier {
  // width: 100%;
  // height: 100%;
  background: #fff;
  padding: 0.5rem;
  .title{
    text-align: center;
    font-size: 1rem;
    color: $color-primary;
  }
  .label{
    font-size: .9rem;
    padding-bottom: .5rem;
  }
  .required-index {
    color: #c00;
    vertical-align: middle;
    margin-right: 2px;
  }
  .textarea {
    flex: 1;
    // background: transparent;
    background: #fff;
    // border: none;
    border: 1px solid #dcdfe6;
    // border: 0;
    padding: 0.5rem;
    line-height: 1.5;
    border-radius: 0.2rem;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  .textarea:focus {
    outline: none;
    // border-color: #409eff;
    // border-color: $color-primary;
  }
  .popup-content {
    height: 100%;
  }
  
}
</style>