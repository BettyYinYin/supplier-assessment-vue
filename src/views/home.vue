<template>
  <div class="home">
    <div class="username-condition">
      <div class="search-input" @touchstart.stop="goList">搜索供应商</div>
    </div>
    <div class="list-wrap">
      <div class="supplier-list">
        <router-link
          class="list-item"
          :class="[item.value]"
          v-for="(item, index) in list"
          :key="index"
          :to="{path: '/supplierList', query: {searchFlag: 'no', evaluateState: supplierStatus[item.value]}}"
        >
          <span class="item-wrap">
            <span class="item-label">{{item.label}}</span>
            <span class="item-num">({{nums[item.value]}})</span>
          </span>
        </router-link>
        <!-- <router-link class="list-item new-add" to="/add">
        <span class="item-wrap">
          <svg-icon iconClass="add" class="item-label" />
          <span class="item-num">新增</span>
        </span>
        </router-link>-->
      </div>
    </div>

    <mt-button @click="goAdd" class="new-add" size="large" type="primary">新增</mt-button>
    <!-- <loading :status="loading" /> -->
    <loading-wrap :status="loading"></loading-wrap>
  </div>
</template>

<script>
import { setTitle, showPreloader, hidePreloader } from "@/utils";
import _ from "lodash";
import { getTotalSupplierEvaluate } from "@/api/home.js";
import { getQuotaMaintainList } from "@/api/operate.js";
export default {
  name: "home",
  data() {
    return {
      list: [
        {
          label: "待提交",
          num: 1,
          value: "noSubmit"
        },
        {
          label: "待审核",
          num: 1,
          value: "noApprove"
        },
        {
          label: "审核通过",
          num: 1,
          value: "pass"
        },
        {
          label: "审核驳回",
          num: 1,
          value: "reject"
        }
      ],
      nums: {
        noSubmit: "",
        noApprove: "",
        pass: "",
        reject: ""
      },
      supplierStatus: {
        noSubmit: "0",
        noApprove: "1",
        pass: "2",
        reject: "3"
      },
      keyword: "",
      loading: false,
      loadingError: false,
      errorText: ""
    };
  },
  created() {
    setTitle("供应商评价");
    this.loading = true
    this.getTotalSupplierEvaluate();
  },
  methods: {
    getTotalSupplierEvaluate() {
      showPreloader();
      getTotalSupplierEvaluate()
        .then(res => {
          const data = res.data;
          this.nums.noSubmit = data.waitSubmitNum || 0;
          this.nums.noApprove = data.waitAuditNum || 0;
          this.nums.pass = data.passNum || 0;
          this.nums.reject = data.rejectNum || 0;
        })
        .catch(err => {
          this.$toast({
            message: err.message || '获取数据失败',
            duration: 2000
          })
        })
        .finally(() => {
          this.loading = false
          hidePreloader();
        });
    },
    goList() {
      this.$router.push({
        path: "/supplierList",
        query: { searchFlag: "yes", evaluateState: "" }
      });
    },
    goAdd() {
      this.$router.push("/add");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.home {
  min-height: 100vh;
  padding-top: 1rem;
  .username-condition {
    padding: 0.5rem 1rem 0.5rem;
    margin-bottom: 1rem;
    .search-input {
      width: 100%;
      height: 2.2rem;
      line-height: 2.2rem;
      padding-left: 0.5rem;
      background-color: $grey-bg-3;
      border-radius: 2px;
      color: $grey-color-3;
      font-size: 0.85rem;
    }
  }
}

// .list-wrap{
  // position: absolute;
  // width: 80%;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
// }

.supplier-list {
  display: flex;
  align-items: center;
  justify-content: space-around;
  // height: 50vh;
  flex-wrap: wrap;
  margin: 3rem 2vw 0;
  // margin: 10% 0;
  // margin-top: 3rem;
}

.noSubmit {
  .item-wrap {
    background: #ff943e;
  }
}

.reject {
  .item-wrap {
    background: #f25643;
  }
}

.noApprove {
  .item-wrap {
    background: #576a95;
  }
}

.pass {
  .item-wrap {
    background: #15bc83;
  }
}

.list-item {
  flex: 0 0 50%;
  text-align: center;
  margin-bottom: 1rem;
  .item-wrap {
    display: inline-block;
    // background: #3296fa;
    color: #fff;
    width: 40vw;
    height: 45vw;
    line-height: 1.5rem;
    font-size: 0.9rem;
    border-radius: 0.2rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .item-num {
      font-size: 0.8rem;
    }
  }
}
.list-item.new-add {
  margin-bottom: 0;
  .item-wrap {
    background-color: rgba(25, 31, 37, 0.08);
    color: rgba(25, 31, 37, 0.4);
    font-size: 0.8rem;
    .svg-icon {
      font-size: 1.2rem;
      height: 1.2rem;
      line-height: 1.2rem;
    }
  }
}

.new-add {
  position: absolute;
  bottom: 2rem;
  width: 80%;
  left: 50%;
  transform: translateX(-50%);
  height: 2.4rem;
  font-size: 1rem;
  margin-top: 2rem;
}
</style>