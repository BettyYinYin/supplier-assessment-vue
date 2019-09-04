<template>
  <div>
    <div class="form-item">
      <span class="label">
        <span class="required-index">*</span>供应商名称
      </span>
      <span class="grey-color select-zone" @click="showSelectSupplierName = true">
        <span
          :class="[operateForm.supplierName? '' :'right']"
        >{{operateForm.supplierName? operateForm.supplierName: '请选择'}}</span>
        <svg-icon iconClass="arrow-right"></svg-icon>
      </span>
    </div>
    <div class="form-item">
      <span class="label">项目名称</span>
      <span class="grey-color select-zone" @click="selectProject">
        <span :class="[supplier.project? '' :'right']">{{supplier.project? supplier.project: '请选择'}}</span>
        <svg-icon iconClass="arrow-right"></svg-icon>
      </span>
    </div>
    <div class="form-item">
      <span class="label">合同名称</span>
      <span class="grey-color" @click="selectContract">
        <span>{{supplier.contract? supplier.contract: '请选择'}}</span>
        <svg-icon iconClass="arrow-right"></svg-icon>
      </span>
    </div>
    <div class="form-item">
      <span class="label">项目负责人</span>
      <span class="grey-color">{{supplier.leader? supplier.leader: ''}}</span>
    </div>
    <div class="title">指标详情</div>
    <div class="form-item">
      <span class="label">
        <span class="required-index">*</span>一级指标
      </span>
      <span class="grey-color">
        <span>{{supplier.fstStandard? supplier.fstStandard: '请选择'}}</span>
        <svg-icon iconClass="arrow-right"></svg-icon>
      </span>
    </div>
    <div class="form-item">
      <span class="label">
        <span class="required-index">*</span>二级指标
      </span>
      <span class="grey-color">
        <span>{{supplier.secStandard? supplier.secStandard: '请选择'}}</span>
        <svg-icon iconClass="arrow-right"></svg-icon>
      </span>
    </div>
    <div class="form-item">
      <span class="label">
        <span class="required-index">*</span>分值
      </span>
      <span class="grey-color">
        <span>{{supplier.score? supplier.score: '请选择'}}</span>
        <svg-icon iconClass="arrow-right"></svg-icon>
      </span>
    </div>
    <div class="form-item form-item-input">
      <span class="label">
        <span class="required-index">*</span>问题描述
      </span>
      <textarea class="textarea" cols="30" rows="3" v-model="desc" placeholder="请输入问题描述"></textarea>
    </div>
    <div class="form-item form-item-input">
      <span class="label">建议处理措施</span>
      <textarea class="textarea" cols="30" rows="3" v-model="handle" placeholder="请输入建立处理措施"></textarea>
    </div>
    <div class="form-item upload-btn-wrap">
      <span class="label">佐证材料</span>
      <div>
        <div v-for="file in supplier.files" class="file-item" :key="file.id">{{file.name}}</div>
      </div>
      <div>
        <span class="upload-btn">上传附件</span>(建议上传)
      </div>
    </div>
    <div class="operate-btn">
      <mt-button size="small" type="primary" v-if="isAdd" @click>暂存</mt-button>
      <mt-button size="small" type="primary" v-if="isAdd">提交</mt-button>
      <mt-button size="small" type="primary" v-if="!isAdd">暂存</mt-button>
      <mt-button size="small" type="primary" v-if="!isAdd">提交</mt-button>
      <mt-button size="small" type="primary" v-if="!isAdd">删除</mt-button>
    </div>

    <!-- popup-transition="popup-fade" -->
    <mt-popup v-model="showSelectSupplierName" class="select-supplier" position="right">
      <div ref="popupContent" class="popup-content">
        <div>
          <div class="search-btn-wrap">
            <input type="text" ref="searchInput" class="input" placeholder="请输入供应商名称" />
            <div @click="showSelectSupplierName=false" class="close-select-btn">取消</div>
          </div>
          <div>
            <div
              class="supplier-item"
              v-for="supplier in supplierList"
              :key="supplier.id"
              @click="selectSupplier(supplier.id, supplier.supplierName)"
            >
              <div class="supplier-name">{{supplier.supplierName}}</div>
              <svg-icon iconClass="arrow-right"></svg-icon>
            </div>
          </div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import { chosen } from "@/utils";
import * as operateApi from "@/api/operate.js";
import BScroll from "better-scroll";
export default {
  props: {
    supplier: {
      type: Object,
      default: {}
    },
    isAdd: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      supplierList: [],
      projectNames: [],
      contractNames: [],
      supplierName: "",
      projectName: "",
      contractName: "",
      showSelectSupplierName: false,
      desc: "",
      handle: "",
      scroll: null,
      operateForm: {
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
        treatmentMeasure: ""
      }
    };
  },
  watch: {
    showSelectSupplierName(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.searchInput.focus();
          this.scroll = new BScroll(this.$refs.popupContent, {
            scrollY: true,
            click: true,
            bounce: false,
            mouseWheel: true
          });
        });
      }
    },
    supplier(val) {
      this.operateForm = this.supplier
    },
    'operateForm.supplierId'() {
      
    }
  },
  created() {
    this.getSupplierList();
  },
  methods: {
    getSupplierList() {
      operateApi
        .getSupplierList({
          param: ""
        })
        .then(res => {
          this.supplierList = res.data;
          chosen(
            [
              {
                key: "选项一",
                value: "1"
              },
              {
                key: "选项二",
                value: "2"
              }
            ],
            function(res) {
              this.supplierName = res.vlaue;
            }
          );
        })
        .catch(err => {});
    },
    getProjectNames() {},
    getContractNames() {},
    selectProject() {},
    selectContract() {},
    // 选中供应商
    selectSupplier(id, supplierName) {
      this.operateForm.supplierName = supplierName;
      this.operateForm.supplierId = id;
      this.showSelectSupplierName = false;
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
  .required-index {
    color: #c00;
    vertical-align: middle;
    margin-right: 2px;
  }
  .right {
    flex: 1;
    text-align: right;
  }
  .select-zone {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    .svg-icon {
      flex: 0 0 0.9rem;
    }
  }
  .label {
    flex: 0 0 5.5rem;
  }
  .textarea {
    flex: 1;
    // background: transparent;
    background: #fff;
    // border: none;
    // border: 1px solid #dcdfe6;
    border: 0;
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

  &.form-item-input {
    align-items: flex-start;
  }

  &.upload-btn-wrap {
    justify-content: flex-start;
    .file-item {
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
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 0.5rem;
  .search-btn-wrap {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 1rem;
    .close-select-btn {
      font-size: 0.9rem;
      color: $color-primary;
      flex: 0 0 2.6rem;
      text-align: right;
    }
  }

  .popup-content {
    height: 100%;
  }
  .supplier-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0.5rem;
    // height: 1.8rem;
    line-height: 1.5rem;
    .supplier-name {
      color: $grey-color-2;
      font-size: 0.95rem;
      word-break: break-all;
    }
    .svg-icon {
      flex: 0 0 2rem;
      color: $grey-color-3;
    }
  }
}
</style>