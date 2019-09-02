<template>
  <div class="home">
    <div class="username-condition bg-white">
      <input
        type="text"
        v-model="keyword"
        ref="searchInp"
        placeholder="搜索"
        @input="searchByKeywords"
      />
    </div>
    <no-data v-if="list.length ===0 && !searchLoading && !loadingError" class="no-data" text="暂无信息" />
    <loading :status="searchLoading" />
    <error-info v-show="loadingError && !searchLoading" :text="errorText" />
    <div class="supplier-list">
      <router-link class="list-item" v-for="(item, index) in list" :key="index" :to="`/${item.value}`">
        <span class="item-wrap">
          <span class="item-label">{{item.label}}</span>
          <span class="item-num">({{item.num}})</span>
        </span>
      </router-link>
      <router-link class="list-item new-add" to="/add">
        <span class="item-wrap">
          <svg-icon iconClass="add" class="item-label" />
          <span class="item-num">新增</span>
        </span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { setTitle } from "@/utils";
import _ from "lodash";
export default {
  name: "home",
  data() {
    return {
      list: [
        {
          label: "待提交",
          num: 1,
          value: 'noSubmit'
        },
        {
          label: "待审核",
          num: 1,
          value: 'noApprove'
        },
        {
          label: "审核通过",
          num: 1,
          value: 'agree'
        },
        {
          label: "审核驳回",
          num: 1,
          value: 'reject'
        }
      ],
      keyword: "",
      searchLoading: false,
      loadingError: false,
      errorText: ''
    };
  },
  created() {
    setTitle("供应商评价");
  },
  methods: {
    searchByKeywords: _.debounce(function() {
      this.searchLoading = true;
      this.loadingError = false;
      this.loadList()
      // userListApi
      //   .getUserList({
      //     userName: this.username
      //   })
      //   .then(result => {
      //     let data = result.data;
      //     const allSelectUsersLength = this.allSelectUsers.length;
      //     data = data.map(user => {
      //       user.deptNames = user.deptNames.split(",");
      //       if (
      //         allSelectUsersLength !== 0 &&
      //         this.allSelectUsers.findIndex(current => {
      //           return user.id === current.id;
      //         }) !== -1
      //       ) {
      //         user.isSelector = true;
      //       } else {
      //         user.isSelector = false;
      //       }
      //       if (allSelectUsersLength === 0 || !user.isSelector) {
      //         this.isAllSelector = false;
      //       }
      //       return user;
      //     });
      //     this.userList = data;
      //   })
      //   .catch(err => {
      //     this.loadingError = false;
      //     this.errorText = err.message;
      //   })
      //   .finally(() => {
      //     this.searchLoading = false;
      //   });
    }, 500),
    loadList() {

    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  padding-top: 1rem;
  .username-condition {
    padding: 0.5rem 1rem 0.5rem;
    margin: 0 .5rem 2rem .5rem;
    .search-input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #eee;
      border-radius: 2px;
      color: #777;
      font-size: 0.8rem;
    }
  }
}
.supplier-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  // height: 50vh;
  flex-wrap: wrap;
}
.list-item {
  flex: 0 0 50%;
  text-align: center;
  margin-bottom: 1rem;
  .item-wrap {
    display: inline-block;
    background: #3296fa;
    color: #fff;
    width: 5rem;
    height: 5.5rem;
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
    color: rgba(25,31,37,.4);
    font-size: 0.8rem;
    .svg-icon {
      font-size: 1.2rem;
      height: 1.2rem;
      line-height: 1.2rem;
    }
  }
}
</style>