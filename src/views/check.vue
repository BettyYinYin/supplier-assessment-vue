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
      <mt-button size="small" type="primary" v-if="evaluateState === '1'" @click="cancel">撤销</mt-button>
      <!-- <mt-button size="small" type="primary" v-if="evaluateState === '1'" @click="isAudit = true">审核</mt-button> -->
      <mt-button size="small" type="primary" v-if="evaluateState === '3'" @click="reaudit">重新评价</mt-button>
    </div>

    <mt-popup v-model="isAudit" :closeOnClickModal="false" class="select-supplier">
      <div class="title">审核</div>
      <div class="label">
        <span class="required-index">*</span>审核结果
      </div>
      <mt-radio v-model="result" :options="resOpts"></mt-radio>
      <div class="label" style="margin-top: .5rem;">
        <span class="required-index" v-show="result === '3'">*</span>审核意见
      </div>
      <textarea
        ref="reason"
        class="textarea"
        cols="30"
        rows="3"
        v-model="reason"
        placeholder="请填写审核意见"
      ></textarea>
      <div class="footer">
        <mt-button size="small" @click="closeModal" :disabled="isSubmiting">取消</mt-button>
        <mt-button size="small" type="primary" @click="submit" :disabled="isSubmiting">确定</mt-button>
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
        auditReason: ""
      },
      id: "",
      remoteFileList: [],
      evaluateState: "",
      isAudit: false,
      reason: "",
      result: "",
      resOpts: [
        {
          label: "通过",
          value: "2"
        },
        {
          label: "驳回",
          value: "3"
        }
      ],
      isSubmiting: false
    };
  },
  watch: {
    isAudit(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.reason.focus();
        });
      }
    }
  },
  created() {
    const { id, evaluateState } = this.$route.query;
    this.id = id;
    this.evaluateState = evaluateState;
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
        .catch(err => {})
        .finally(() => {
          hidePreloader();
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
    // 撤销接口
    cancel() {
      showPreloader()
      update({
        id: this.id,
        evaluateState: 0,
        hasback: 1
      })
        .then(() => {
          this.$toast({
            message: "撤销成功",
            duration: 2000
          });
          this.$router.go(-1)
        })
        .catch(err => {
          this.$toast({
            message: err.message || "撤销失败",
            duration: 2000
          });
          
        }).finally(() => {
          hidePreloader()
        });
    },
    // 审核接口
    audit() {
      this.isSubmiting = true
      update({
        id: this.id,
        evaluateState: this.result,
        auditReason: this.reason
      }).then(() => {
        this.$toast({
          message: '提交成功',
          duration: 2000
        })
        // this.$router.push({path: '/supplierList', query: {searchFlag: 'no', evaluateState:1}})
        this.$router.go(-1)
      }).catch(err => {
        this.$toast({
          message: '提交失败',
          duration: 2000
        })
      }).finally(() => {
        this.isSubmiting = false
      })
    },
    submit() {
      if(!this.result){
        return this.$toast({
          message: '请选择审核结果',
          duration: 2000,
          position: 'top'
        })
      }

      if(!this.reason && this.result === '3'){
        return this.$toast({
          message: '审核意见不能为空',
          duration: 2000,
          position: 'top'
        })
      }

      this.audit()
    },
    closeModal() {
      this.result = ''
      this.reason = ''
      this.isAudit = false
    },
    reaudit() {
      this.$router.replace({path: '/unsubmit/edit', query: {id: this.id}})
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
    align-items: flex-start;
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

.operate-btn, .footer {
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
  .title {
    text-align: center;
    font-size: 1rem;
    color: $color-primary;
  }

  .label {
    font-size: 0.9rem;
    padding-bottom: 0.5rem;
    color: $grey-color-1;
  }

  .required-index {
    color: #c00;
    vertical-align: middle;
    margin-right: 2px;
  }
  /deep/ .mint-radiolist-title {
    display: none;
  }
  /deep/ .mint-cell {
    display: inline-block;
    min-height: 38px;
  }
  /deep/ .mint-cell-wrapper {
    background-image: none;
    font-size: .9rem;
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
    color: $grey-color-1;
    margin: 0.5rem 1rem 0;
  }

  .textarea:focus {
    outline: none;
    border-color: #409eff;
    // border-color: $color-primary;
  }
  .popup-content {
    height: 100%;
  }
}
</style>