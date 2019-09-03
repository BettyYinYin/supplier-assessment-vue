<template>
  <div>
    <div class="form-item">
      <span class="label">
        <span class="required-index">*</span>供应商名称
      </span>
      <span class="grey-color select-zone" @click="showSelectSupplierName = true">
        <span :class="[supplier.name? '' :'right']">{{supplier.name? supplier.name: '请选择'}}</span>
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
      <textarea class="textarea" cols="30" rows="3" v-model="desc"></textarea>
    </div>
    <div class="form-item form-item-input">
      <span class="label">建议处理措施</span>
      <textarea class="textarea" cols="30" rows="3" v-model="handle"></textarea>
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
      <mt-button size="small" type="primary" v-if="isAdd">暂存</mt-button>
      <mt-button size="small" type="primary" v-if="isAdd">提交</mt-button>
      <mt-button size="small" type="primary" v-if="!isAdd">暂存</mt-button>
      <mt-button size="small" type="primary" v-if="!isAdd">提交</mt-button>
      <mt-button size="small" type="primary" v-if="!isAdd">删除</mt-button>
    </div>

    <!-- popup-transition="popup-fade" -->
    <mt-popup v-model="showSelectSupplierName" class="select-supplier" position="right">
      <div class="search-btn-wrap">
        <input type="text" ref="searchInput" class="input" placeholder="请输入供应商名称" />
        <div @click="showSelectSupplierName=false" class="close-select-btn">取消</div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import { chosen } from "@/utils";
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
      supplierNames: [],
      projectNames: [],
      contractNames: [],
      supplierName: "",
      projectName: "",
      contractName: "",
      showSelectSupplierName: false,
      desc: "",
      handle: ""
    };
  },
  created() {
    this.desc = this.supplier.desc;
    this.handle = this.supplier.handle;
  },
  watch: {
    showSelectSupplierName(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.searchInput.focus();
        });
      }
    },
    "supplier.handle"(val) {
      if (val) {
        this.handle = val;
      }
    },
    "supplier.desc"(val) {
      if (val) {
        this.desc = val;
      }
    }
  },
  created() {
    this.getSupplierNames();
    this.getProjectNames();
    this.getContractNames();
  },
  methods: {
    getSupplierNames() {
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
          this.isSelectSupplierName = false;
        }
      );
    },
    getProjectNames() {},
    getContractNames() {},
    selectProject() {},
    selectContract() {}
  }
};
</script>  

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.form-item {
  display: flex;
  font-size: 0.85rem;
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
    background: #ffffff;
    // border: none;
    border: 1px solid #dcdfe6;
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
    .close-select-btn {
      font-size: 0.9rem;
      color: $color-primary;
      flex: 0 0 2.6rem;
      text-align: right;
    }
  }
}
</style>