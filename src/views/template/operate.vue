<template>
  <div class="operate">
    <div class="form-item">
      <span class="label">
        <span class="required-index">*</span>供应商名称
      </span>
      <span class="grey-color select-zone">
        <span
         @click="showSelectSupplierName"
          :class="[!!operateForm.supplierName? '' :'right']"
        >{{operateForm.supplierName? operateForm.supplierName: '请选择'}}</span>
        <svg-icon iconClass="arrow-right"></svg-icon>
      </span>
    </div>
    <div class="form-item">
      <span class="label">项目名称</span>
      <span class="grey-color select-zone">
        <!-- :class="[supplier.projectName? '' :'right']" -->
        <span
         @click="selectProject"
          :class="[!!operateForm.projectName? '' :'right']"
        >{{operateForm.projectName? operateForm.projectName: '请选择'}}</span>
        <svg-icon iconClass="arrow-right" v-if="!operateForm.projectName"></svg-icon>
        <svg-icon iconClass="clear2" v-else @click="clearProject"></svg-icon>
      </span>
    </div>
    <div class="form-item">
      <span class="label">合同名称</span>
      <span class="grey-color select-zone" @click="selectContract">
        <span
          :class="[!!operateForm.contractName? '' :'right']"
        >{{operateForm.contractName? operateForm.contractName: '请选择'}}</span>
        <svg-icon iconClass="arrow-right" v-if="!operateForm.contractName"></svg-icon>
        <svg-icon iconClass="clear2" v-else @click="clearContract"></svg-icon>
        
      </span>
    </div>
    <div class="form-item">
      <span class="label">项目负责人</span>
      <span class="grey-color select-zone">{{operateForm.leader? operateForm.leader: ''}}</span>
    </div>
    <!--  @click="showQuotaModal" -->
    <div class="title quota-label">
      <router-link to="/quota" class>指标详情</router-link>
    </div>
    <div class="form-item">
      <span class="label">
        <span class="required-index">*</span>一级指标
      </span>
      <span class="grey-color select-zone" @click="selectOneQuota">
        <span
          :class="[!!operateForm.oneQuotaName? '' :'right']"
        >{{operateForm.oneQuotaName? operateForm.oneQuotaName: '请选择'}}</span>
        <svg-icon iconClass="arrow-right"></svg-icon>
      </span>
    </div>
    <div class="form-item">
      <span class="label">
        <span class="required-index">*</span>二级指标
      </span>
      <span class="grey-color select-zone" @click="selectTwoQuota">
        <span
          :class="[!!operateForm.twoQuotaName? '' :'right']"
        >{{operateForm.twoQuotaName? operateForm.twoQuotaName: '请选择'}}</span>
        <svg-icon iconClass="arrow-right"></svg-icon>
      </span>
    </div>
    <div class="form-item">
      <span class="label">
        <span class="required-index">*</span>分值
      </span>
      <span class="grey-color select-zone" @click="selectScore">
        <!-- supplier.quotaScore || supplier.quotaScore === 0? (supplier.quotaScore | formatQuotaScore( supplier.quotaType)): '请选择' -->
        <span :class="[!!operateForm.quotaScore || operateForm.quotaScore === 0? '' :'right']">
          <span
            v-if="operateForm.quotaScore || operateForm.quotaScore === 0"
          >{{operateForm.quotaScore | formatQuotaScore( operateForm.quotaType)}}</span>
          <span v-else>请选择</span>
        </span>

        <svg-icon iconClass="arrow-right"></svg-icon>
      </span>
    </div>
    <div class="form-item form-item-input">
      <span class="label">
        <span class="required-index">*</span>问题描述
      </span>
      <textarea
        class="textarea"
        cols="30"
        rows="3"
        v-model="operateForm.problemDescript"
        placeholder="请输入问题描述"
      ></textarea>
    </div>
    <div class="form-item form-item-input">
      <span class="label">建议处理措施</span>
      <textarea
        class="textarea"
        cols="30"
        rows="3"
        v-model="operateForm.treatmentMeasure"
        placeholder="请输入建立处理措施"
      ></textarea>
    </div>
    <div class="form-item upload-btn-wrap">
      <span class="label">佐证材料</span>
      <div class="file-list">
        <div class="upload-btn">
          <span>上传附件</span>
          <input type="file" ref="uploader" @change="fileChange" class="uploader" multiple />
        </div>(建议上传)
        <div class="file-item" v-for="(file, index) in remoteFileList" :key="file.id">
          <!-- <span class="file-name" @click="download(file)">{{file.oldFileName}}</span> -->
          <a :href="download(file)" download="file" class="file-name">{{file.oldFileName}}</a>
          <span class="delete-btn" @click="deleteRemoteFile(file, index)">
            <svg-icon icon-class="clear2" />
          </span>
        </div>
        <div v-for="(file,index) in fileList" class="file-item" :key="file.name">
          <span class="file-name">{{file.name}}</span>
          <span class="delete-btn" @click="deleteFile(index)">
            <svg-icon icon-class="clear2" />
          </span>
        </div>
      </div>
    </div>
    <div class="operate-btn">
      <!--  v-if="isAdd" -->
      <!--  v-if="isAdd" -->
      <mt-button size="small" type="primary" @click="storage">暂存</mt-button>
      <mt-button size="small" type="primary" @click="submit">提交</mt-button>
      <mt-button size="small" type="primary" v-if="!isAdd" @click="deleteSupplier">删除</mt-button>
    </div>

    <!-- 选择供应商弹窗开始 -->
    <mt-popup v-model="isSelectSupplierName" class="select-supplier" position="right">
      <div ref="popupContent" class="popup-content">
        <div>
          <div class="search-btn-wrap">
            <!-- <input type="text" ref="searchInput" class="input" placeholder="请输入供应商名称" /> -->
            <form action="#" class="search-form" onsubmit="return false;">
              <input
                type="search"
                autocomplete="off"
                v-model="keyword"
                @keydown="search($event)"
                ref="searchInput"
                class="input"
                placeholder="搜索供应商"
              />
            </form>
            <div @click="closeSelectSupplierName" class="close-select-btn">取消</div>
          </div>
          <div v-if="supplierList.length !== 0">
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
          <div v-else>
            <loading :status="loadingSupplierList" />
            <no-data v-if="!loadingSupplierList"></no-data>
          </div>
        </div>
      </div>
    </mt-popup>
    <!-- 选择供应商弹窗结束 -->

    <!-- 选择指标弹窗开始 -->
    <!-- <mt-popup v-model="isSelectQuota" class="select-quota" position="right">
      <div ref="popupContentQuota" class="popup-content">
        <quota @selectQuota="selectQuota"/>
      </div>
      
    </mt-popup>-->
    <!-- 选择指标弹窗结束 -->
  </div>
</template>

<script>
import { chosen, showPreloader, hidePreloader } from "@/utils";
import * as operateApi from "@/api/operate.js";
import * as quotaApi from "@/api/quota.js";
import BScroll from "better-scroll";
import Config from "@/config.js";
import Quota from "../quota";
import { mapGetters } from "vuex";
export default {
  props: {
    supplier: {
      type: Object,
      default: {}
    },
    isAdd: {
      type: Boolean,
      required: true
    },
    id: {
      type: String
    }
  },
  components: {
    Quota
  },
  data() {
    return {
      supplierList: [],
      projectList: [],
      contractList: [],
      oneQutoaList: [],
      twoQutoaList: [],
      supplierName: "",
      projectName: "",
      contractName: "",
      isSelectSupplierName: false,
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
      },
      keyword: "",
      loadingSupplierList: false,
      loadingContract: false,
      loadingOneQutoaList: false,
      loadingTwoQutoaList: false,
      remoteFileList: [],
      fileList: []
      // isSelectQuota: false
    };
  },
  computed: {
    formatContractList() {
      let res;
      if (this.operateForm.projectId) {
        res = this.contractList.filter(item => {
          return item.projectId === this.operateForm.projectId;
        });
        return res.map(item => {
          return {
            key: item.contractName,
            value: item.id
          };
        });
      }
      res = this.contractList.map(item => {
        return {
          key: item.contractName,
          value: item.id
        };
      });
      return res;
    },
    formatProjectList() {
      return this.projectList.map(item => {
        return {
          key: item.name,
          value: item.id
        };
      });
    },
    formatOneQutoaList() {
      return this.oneQutoaList.map(item => {
        return {
          key: item.name,
          value: item.id
        };
      });
    },
    formatTwoQutoaList() {
      return this.twoQutoaList.map(item => {
        return {
          key: item.name,
          value: item.id
        };
      });
    },
    formatScoreList() {
      const twoQuota = this.twoQutoaList.find(item => {
        return item.id === this.operateForm.twoQuotaId;
      });
      if (!twoQuota) {
        return [];
      }
      const scoreList = twoQuota.quotaScore;
      let res;
      scoreList &&
        (res = scoreList.split(";").map((item, index) => {
          return {
            key:
              (twoQuota.quotaType === 0 ? "+" : "-") +
              ((item && item.toString()) || ""),
            value: index
          };
        }));

      return res || [];
    },
    submitParams() {
      return {
        id: this.id,
        supplierId: this.operateForm.supplierId,
        supplierName: this.operateForm.supplierName,
        contractId: this.operateForm.contractId,
        contractName: this.operateForm.contractName,
        projectId: this.operateForm.projectId,
        projectName: this.operateForm.projectName,
        leader: this.operateForm.leader,
        oneQuotaId: this.operateForm.oneQuotaId,
        twoQuotaId: this.operateForm.twoQuotaId,
        quotaScore: this.operateForm.quotaScore,
        problemDescript: this.operateForm.problemDescript,
        treatmentMeasure: this.operateForm.treatmentMeasure
      };
    },
    ...mapGetters(["isSelect", "quotaOne", "quotaTwo"])
  },
  watch: {
    isSelectSupplierName(val) {
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
    // isSelectQuota(val) {
    //   if (val) {
    //     this.$nextTick(() => {
    //       this.scroll = new BScroll(this.$refs.popupContentQuota, {
    //         scrollY: true,
    //         click: true,
    //         bounce: false,
    //         mouseWheel: true
    //       });
    //     });
    //   }
    // },
    supplier(val) {
      const {
        supplierId,
        supplierName,
        projectId,
        projectName,
        contractId,
        contractName,
        leader,
        oneQuotaId,
        oneQuotaName,
        twoQuotaId,
        twoQuotaName,
        quotaScore,
        quotaType,
        problemDescript,
        treatmentMeasure
      } = val;
      this.operateForm.supplierId = supplierId || '';
      this.operateForm.supplierName = supplierName || '';
      this.operateForm.projectId = projectId || '';
      this.operateForm.projectName = projectName || '';
      this.operateForm.contractId = contractId || '';
      this.operateForm.contractName = contractName || '';
      this.operateForm.leader = leader || '';
      this.operateForm.oneQuotaId = oneQuotaId || '';
      this.operateForm.oneQuotaName = oneQuotaName || '';
      this.operateForm.twoQuotaId = twoQuotaId || '';
      this.operateForm.twoQuotaName = twoQuotaName || '';
      this.operateForm.quotaScore = quotaScore || '';
      this.operateForm.quotaType = quotaType || '';
      this.operateForm.problemDescript = problemDescript || '';
      this.operateForm.treatmentMeasure = treatmentMeasure || '';
    },
    "operateForm.supplierName"() {
      this.getContractList();
    },
    "operateForm.oneQuotaId"() {
      console.log(111111111);
      this.getTwoQuotaList();
    },
    "operateForm.twoQuotaId"(val) {
      if (val) {
        const twoQuota = this.twoQutoaList.find(item => {
          return item.id === val;
        });
        if (twoQuota) {
          this.operateForm.quotaType = twoQuota.quotaType;
        }
      }
    },
    isSelect(val) {
      if (val) {
        this.operateForm.oneQuotaId = this.quotaOne.id;
        this.operateForm.oneQuotaName = this.quotaOne.name;
        this.operateForm.twoQuotaId = this.quotaTwo.id;
        this.operateForm.twoQuotaName = this.quotaTwo.name;
        this.$store.commit("quota/TOGGLE_STATUS");
      }
    }
  },
  created() {
    this.getSupplierList();
    this.getContractList();
    this.getOneQuotaList();
    this.getTwoQuotaList();
    if (!this.isAdd) {
      this.findFileList();
    }
    console.log('isSelect', this.isSelect)
  },
  methods: {
    getProjectNames() {},
    getContractNames() {},
    // 选择项目
    selectProject() {
      if (this.loadingContract) {
        return this.$toast({
          message: "加载中,请稍后重试",
          duration: 2000
        });
      }

      if (this.formatProjectList.length === 0) {
        return this.$toast({
          message: "项目为空",
          duration: 2000
        });
      }

      chosen(
        this.formatProjectList,
        this.operateForm.projectName || "",
        res => {
          if (!this.operateForm.projectId || (this.operateForm.projectId !== res.value)) {
            this.operateForm.projectId = res.value;
            this.operateForm.projectName = res.key;
            this.operateForm.leader = this.projectList.find(item => {
              item.id === this.operateForm.projectId;
            });
            this.operateForm.contractId = "";
            this.operateForm.contractName = "";
          }
        }
      );
    },
    // 选择合同
    selectContract() {
      if (this.loadingContract) {
        return this.$toast({
          message: "加载中,请稍后重试",
          duration: 2000
        });
      }

      if (this.formatContractList.length === 0) {
        return this.$toast({
          message: "合同为空",
          duration: 2000
        });
      }

      chosen(
        this.formatContractList,
        this.operateForm.contractName || "",
        res => {
          this.operateForm.contractId = res.value;
          this.operateForm.contractName = res.key;
          const contract = this.contractList.find(item => {
            return item.id === res.value;
          });
          this.operateForm.projectId = contract.projectId;
          this.operateForm.projectName = contract.projectName;
          this.operateForm.leader = contract.leader;
        }
      );
    },
    // 获取供应商下拉列表
    getSupplierList() {
      this.loadingSupplierList = true;
      operateApi
        .getSupplierList({
          param: this.keyword
        })
        .then(res => {
          this.supplierList = res.data;
        })
        .catch(err => {})
        .finally(() => {
          this.loadingSupplierList = false;
        });
    },
    // 选择供应商
    selectSupplier(id, supplierName) {
      if (this.operateForm.supplierId !== id) {
        this.operateForm.supplierName = supplierName;
        this.operateForm.supplierId = id;
        this.operateForm.contractId = "";
        this.operateForm.contractName = "";
        this.operateForm.projectId = "";
        this.operateForm.projectName = "";
        this.operateForm.leader = "";
      }
      this.isSelectSupplierName = false;
    },
    // 搜索供应商
    search(e) {
      if (e.keyCode == 13) {
        this.supplierList = [];
        this.getSupplierList();
      }
    },
    // 显示供应商下拉列表弹窗
    showSelectSupplierName() {
      this.isSelectSupplierName = true;
    },
    // 关闭供应商下拉列表弹窗
    closeSelectSupplierName() {
      this.isSelectSupplierName = false;
    },
    // 获取合同和项目下拉列表
    getContractList() {
      if (!this.operateForm.supplierName) {
        return;
      }
      this.loadingContract = true;
      this.contractList = [];
      this.projectList = [];
      operateApi
        .getContractList({
          supplierName: this.operateForm.supplierName
        })
        .then(res => {
          const { projectList, contractList } = res.data || {
            projectList: [],
            contractList: []
          };
          this.contractList = contractList;
          this.projectList = projectList;
        })
        .finally(() => {
          this.loadingContract = false;
        });
    },
    // 获取一级指标下拉列表
    getOneQuotaList() {
      this.loadingOneQutoaList = true;
      operateApi
        .getOneQuotaList()
        .then(res => {
          this.oneQutoaList = res.data || [];
        })
        .catch(err => {})
        .finally(() => {
          this.loadingOneQutoaList = false;
        });
    },
    // 获取二级指标列表
    getTwoQuotaList() {
      if (!this.operateForm.oneQuotaName) {
        return;
      }
      this.loadingTwoQutoaList = true;
      operateApi
        .getTwoQuotaList({
          parentId: this.operateForm.oneQuotaId
        })
        .then(res => {
          this.twoQutoaList = res.data;
        })
        .finally(() => {
          this.loadingTwoQutoaList = false;
        });
    },
    // 选择一级指标
    selectOneQuota() {
      if (this.loadingOneQutoaList) {
        return this.$toast({
          message: "加载中,请稍后重试",
          duration: 2000
        });
      }

      if (this.formatOneQutoaList.length === 0) {
        return this.$toast({
          message: "一级指标为空",
          duration: 2000
        });
      }
      chosen(
        this.formatOneQutoaList,
        this.operateForm.oneQuotaName || "",
        res => {
          if (!this.operateForm.oneQuotaId || this.operateForm.oneQuotaId !== res.value) {
            this.operateForm.oneQuotaId = res.value;
            this.operateForm.oneQuotaName = res.key;
            this.operateForm.twoQuotaId = "";
            this.operateForm.twoQuotaName = "";
            this.operateForm.quotaScore = "";
            this.operateForm.quotaType = "";
          }
        }
      );
    },
    // 选择二级指标
    selectTwoQuota() {
      if (!this.operateForm.oneQuotaId) {
        return this.$toast({
          message: "请选择一级指标",
          duration: 2000
        });
      }
      if (this.loadingTwoQutoaList) {
        return this.$toast({
          message: "加载中,请稍后重试",
          duration: 2000
        });
      }

      if (this.formatTwoQutoaList.length === 0) {
        return this.$toast({
          message: "二级指标为空",
          duration: 2000
        });
      }

      chosen(
        this.formatTwoQutoaList,
        this.operateForm.twoQuotaName || "",
        res => {
          this.operateForm.twoQuotaId = res.value;
          this.operateForm.twoQuotaName = res.key;
        }
      );
    },
    // 选择分数
    selectScore() {
      if (!this.operateForm.oneQuotaId || !this.operateForm.twoQuotaId) {
        return this.$toast({
          message: "请先选择指标",
          duration: 2000
        });
      }

      if (this.loadingTwoQutoaList) {
        return this.$toast({
          message: "加载中,请稍后重试",
          duration: 2000
        });
      }

      if (this.formatScoreList.length === 0) {
        return this.$toast({
          message: "二级指标为空",
          duration: 2000
        });
      }

      const currentKey = `${
        this.operateForm.quotaType === 0 && this.operateForm.quotaScore !== 0
          ? "+"
          : this.operateForm.quotaType === 1 &&
            this.operateForm.quotaScore !== 0
          ? "-"
          : ""
      }${this.operateForm.quotaScore}`;
      chosen(this.formatScoreList, currentKey || "", res => {
        const hasOperator =
          res.key.indexOf("+") !== -1 || res.key.indexOf("-") !== -1;
        if (hasOperator) {
          this.operateForm.quotaScore = res.key.substr(1);
        } else {
          this.operateForm.quotaScore = res.key;
        }
      });
    },
    // 暂存
    storage() {
      this.save(0);
    },
    // 提交
    submit() {
      this.save(1);
    },
    uploadFile() {
      this.fileList.forEach(file => {
        let formData = new FormData();
        formData.append("sysCode", "project");
        formData.append("businessNode", "project_supplier");
        formData.append("businessId", this.id);
        formData.append("file", file);
        operateApi
          .upload(formData)
          .then(res => {
            // this.$toast({
            //   message: `${file.name}上传成功`,
            //   duration: 2000
            // });
          })
          .catch(err => {
            this.$toast({
              message: `${file.name}上传失败`,
              duration: 2000
            });
          });
      });
    },
    fileChange(file) {
      let fileMap = {};
      let fileList = Array.prototype.slice.call(this.$refs.uploader.files);
      fileList = fileList.reduce((pre, cur) => {
        if (fileMap[cur.name]) {
          fileMap[cur.name] = "";
          this.$toast({
            message: `${cur.name}存在重复`,
            duration: 2000
          });
        } else {
          fileMap[cur.name] = true;
          if (cur.size === 0) {
            this.$toast({
              message: `${cur.name}材料为空`,
              duration: 2000
            });
          } else if (!(cur.size / 1024 / 1024 < 20)) {
            this.$toast({
              message: `${cur.name}材料超过20M最大限制`,
              duration: 2000
            });
          } else {
            pre.push(cur);
          }
        }
        return pre;
      }, []);
      this.fileList = fileList;
    },
    deleteFile(index) {
      this.fileList.splice(index, 1);
    },
    deleteRemoteFile(file, index) {
      operateApi
        .deleteFile({
          fileId: file.id
        })
        .then(res => {
          this.$toast({
            message: "删除成功",
            duration: 2000
          });
          this.remoteFileList.splice(index, 1);
        })
        .catch(err => {
          this.$toast({
            message: "删除失败",
            duration: 2000
          });
        });
    },
    findFileList() {
      operateApi
        .findFileList({
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
      return `${Config.API_FILE_SERVER}/file/download?fileId=${file.id}`;
    },
    // 暂存接口
    save(evaluateState) {
      // 暂存和提交,供应商名称都不能为空
      // 提交时,还要校验其他参数
      if (
        (evaluateState === 0 &&
          this.validateRequired(
            this.operateForm.supplierId,
            "供应商名称不能为空"
          )) ||
        (evaluateState === 1 &&
          this.validateRequired(
            this.operateForm.supplierId,
            "供应商名称不能为空"
          ) &&
          this.validateRequired(
            this.operateForm.oneQuotaId,
            "一级指标不能为空"
          ) &&
          this.validateRequired(
            this.operateForm.twoQuotaId,
            "二级指标不能为空"
          ) &&
          this.validateRequired(this.operateForm.quotaScore, "分值不能为空") &&
          this.validateRequired(
            this.operateForm.problemDescript,
            "问题描述不能为空"
          ))
      ) {
        showPreloader();
        this.uploadFile();
        operateApi
          .save({ ...this.submitParams, evaluateState })
          .then(res => {
            this.$toast({
              message: evaluateState === 0 ? "暂存成功" : "提交成功",
              duration: 2000
            });
            if (this.isAdd) {
              this.$router.push({
                path: "/home"
              });
            } else {
              // this.$router.push({
              //   path: "/supplierList",
              //   query: {
              //     evaluateState: "0",
              //     searchFlag: "no"
              //   }
              // });
              this.$router.go(-1);
            }
          })
          .catch(err => {
            this.$toast({
              message:
                err.message || (evaluateState === 0 ? "暂存失败" : "提交失败")
            });
          })
          .finally(() => {
            hidePreloader();
          });
      }
    },
    validateRequired(key, message) {
      if (!key) {
        this.$toast({
          message,
          duration: 2000
        });
        return false;
      }
      return true;
    },
    deleteSupplier() {
      showPreloader();
      operateApi
        .update({
          id: this.id,
          delteFlag: 1
        })
        .then(res => {
          this.$toast({
            message: "删除成功",
            duration: 2000
          });
          this.$router.push({
            path: "supplierList",
            query: { searchFlag: "no", evaluateState: 0 }
          });
        })
        .catch(err => {
          this.$toast({
            message: "删除失败",
            duration: 2000
          });
        })
        .finally(() => {
          hidePreloader();
        });
    },
    clearProject() {
      this.operateForm.projectId = ''
      this.operateForm.projectName = ''
      this.operateForm.leader = ''
    },
    clearContract() {
      this.operateForm.contractId = ''
      this.operateForm.contractName = ''
    }
    // showQuotaModal() {
    //   this.isSelectQuota = true;
    // },
    // selectQuota(payload) {
    //   this.isSelectQuota = false
    //   this.operateForm.oneQuotaId = payload.quotaOne.id;
    //   this.operateForm.oneQuotaName = payload.quotaOne.name;
    //   this.operateForm.twoQuotaId = payload.quotaTwo.id;
    //   this.operateForm.twoQuotaName = payload.quotaTwo.name;
    // }
  }
};
</script>  

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.operate {
  /deep/ .v-modal {
    background: #fff;
  }
}
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
    word-break: break-all;
    span{
      flex: 1;
    }
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
    align-items: flex-start;
    .file-list {
      flex: 1;
      .file-item {
        color: $color-primary;
        line-height: 1.4rem;
        font-size: 0.8rem;
        position: relative;
        .file-name {
          display: block;
          // overflow: hidden;
          // white-space: nowrap;
          // text-overflow: ellipsis;
          margin-right: 1.2rem;
          margin-bottom: 0.5rem;
          word-break: break-all;
          color: $color-primary;
        }
        .delete-btn {
          position: absolute;
          right: 5px;
          top: 0;
          line-height: inherit;
        }
      }
    }

    .upload-btn {
      display: inline-block;
      color: $color-primary;
      margin-right: 0.5rem;
      position: relative;
      .uploader {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        opacity: 0;
        width: 4rem;
      }
    }
  }
}

.title {
  font-size: 0.85rem;
  padding: 0.5rem;
}

.quota-label {
  color: #576a95;
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

.select-quota {
  width: 100%;
  height: 100%;
  background: #fff;
  // padding: 0.5rem;
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
    .search-form {
      flex: 1;
    }
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