<template>
  <div class="version-wrap">
    <div class="add-btn-wrap" v-if="allowAdd">
      <span class="add-btn" @touchstart.prevent="add">新增</span>
    </div>
    <div class="infinite-srcoll-wrap">
      <ListWrapper
      :requestData="findAllVersionList.bind(this)"
      :onDataChange="updateList"
      :allowRefresh="true"
      :allowLoadmore="true"
      :pageSize="10"
      ref="listWrapper"
      class="list"
    >
      <div v-for="(version,index) in versions" :key="index" class="version" slot="list">
        <div class="version-num title">{{version.versionNum}}</div>
        <div class="version-time"><span class="title">发布日期:</span><span class="content">{{version.createTime | dateFormat}}</span></div>
        <div class="version-content"><span class="title">发布内容:</span><span class="content"  v-html="version.content"></span></div>
      </div>
    </ListWrapper>
    </div>
  </div>
</template>

<script>
import { setTitle } from "@/utils";
import versionApi from '@/api/version'
export default {
  name: "version.list",
  // components: {
  //   ListWrapper
  // },
  data() {
    return {
      allowAdd: false,
      allLoaded: false,
      loading: false,
      loadingMore: false,
      loadingError: false,
      versions: [],
      errorText: "",
      moduleFlag: ''
    };
  },
  created() {
    this.setTitle();
    this.moduleFlag = sessionStorage.getItem('moduleFlag')
  },
  methods: {
    setTitle() {
      setTitle("版本日志");
    },
    add() {
      this.$router.push({ path: "/version/add" });
    },
    updateList(list) {
      this.versions = list;
    },
    findAllVersionList({ current, pageSize }) {
      return versionApi.findAllVersionList({
        moduleFlag: this.moduleFlag,
        pageNo: current,
        pageSize
      })
        .then(res => {
          const { success, data, errorMsg } = res;

          this.allowAdd = data && data.isManager || false;
          if (success) {
            return Promise.resolve((data && data.page && data.page.result) || []);
          } else {
            return Promise.reject(errorMsg);
          }
        })
        .catch(err => {
          return Promise.reject(err.message || '查询失败');
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.version-wrap {
  margin-top: 1rem;
  min-height: calc(100vh - 1rem);
}

.version {
  margin-bottom: 1rem;
  background: #fff;
  padding: 0.5rem 1rem 0.5rem;
  .title {
    color: #333;
    font-size: .95rem;
    flex: 0 0 5rem;
  }
  .content {
    color: #717171;
    font-size: .9rem;
  }
}

.infinite-srcoll-wrap{
  height: calc(100vh - 2.5rem);
}

.version-load-more {
  position: relative;
  min-height: calc(100vh - 3rem);
}

.version-num {
  color: #575b60;
  font-size: 1rem;
  padding-bottom: 1rem;
}

.version-time {
  display: flex;
  font-size: 0.9rem;
  color: #7a7d81;
  background: #fff;
}

.version-content {
  display: flex;
  line-height: 1.5rem;
  color: #7a7d81;
  text-align: justify;
  font-size: 0.9rem;
  background: #fff;
}

.add-btn-wrap {
  text-align: center;
  background: #fff;
  margin-bottom: 1rem;
  /* margin-right: 1rem; */
}

.add-btn {
  display: inline-block;
  height: 1.5rem;
  line-height: 1.5rem;
  color: #3296fa;
  /* padding-left: 1rem; */
}
</style>

