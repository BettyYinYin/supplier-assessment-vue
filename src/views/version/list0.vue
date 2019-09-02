<template>
  <div class="version-wrap">
    <div class="add-btn-wrap">
      <span class="add-btn" @touchstart.prevent="add">新增</span>
    </div>
    <div class="load-wrap">
      <mt-loadmore
      class="version-load-more"
      :bottom-method="loadMoreVersion"
      :bottom-all-loaded="allLoaded"
      :bottomDistance="0"
      ref="loadmore"
    >
      <div v-if="versions.length !== 0" class="version-list">
        <div v-for="(version,index) in versions" :key="index" class="version">
        <div class="version-num">{{version.num}}</div>
        <div class="version-time">发布日期:</div>
        <div class="version-content">发布内容: {{version.content}}</div>
      </div>
      <no-data
        v-if="versions.length === 0 && !loading && !loadingError"
        class="no-data"
        text="暂无日志"
      />
      <error-info
        v-show="versions.length === 0 && loadingError && !loading"
        :text="errorText"
      />
      <loading :status="loading"/>
      <div class="load-more-status">
        <loading :status="loadingMore"/>
        <span v-show="allLoaded && versions.length !== 0">已全部加载</span>
      </div>
      </div>
      <div></div>
    </mt-loadmore>
    </div>
    <!-- <div class="add-btn-wrap" v-if="allowAdd">
      <span class="add-btn" @touchstart.prevent="add">新增</span>
    </div> -->
  </div>
</template>

<script>
import { setTitle } from '@/utils'
import versionApi from '@/api/version'
export default {
  name: "version.list",
  data() {
    return {
      allowAdd: false,
      allLoaded: false,
      loading: false,
      loadingMore: false,
      loadingError: false,
      pageNo:1,
      pageSize: 10,
      versions: [],
      errorText: '',
      moduleFlag: ''
    };
  },
  created() {
    this.setTitle()
    this.moduleFlag = sessionStorage.getItem('moduleFlag')
    this.findAllVersionList(0)
  },
  methods: {
    setTitle() {
      setTitle('版本日志')
    },
    loadMoreVersion() {
      console.log('@@@@@@@@@@@@@@@@@@@@@')
      this.pageNo = this.pageNo + 1;
      this.findAllVersionList(1);
      // this.$refs.loadmore.onBottomLoaded();
    },
    findAllVersionList(flag) {
      console.log('flag', flag)
      if (flag === 0) {
        this.loading = true;
      } else {
        this.loadingMore = true;
      }
      this.loadingError = false;
      versionApi.findAllVersionList({
        moduleFlag: this.moduleFlag,
        pageNO: this.pageNo,
        pageSize: this.pageSize
      })
        .then(result => {
          const data = result.data.result;

          this.versions = this.versions.concat(data.slice(1));
          this.allowAdd = data && data[0]
          if (this.versions.length === 0) {
            this.allLoaded = true;
          } else if (this.versions.length === data.totalCount) {
            this.allLoaded = true;
          }
        })
        .catch(err => {
          this.errorText = err.message;
          this.loadingError = true;
          console.error("获取版本日志失败", err);
        })
        .finally(() => {
          if (flag === 0) {
            this.loading = false;
          } else {
            this.loadingMore = false;
          }
        });
    },
    add() {
      this.$router.push({path: '/version/add'})
    }
  }
};
</script>

<style>
.version-wrap {
  margin-top: 1rem;
  min-height: calc(100vh - 1rem);
  /* overflow: scroll; */
}

.version {
  margin-bottom: 1rem;
  background: #fff;
  padding: 0.5rem 1rem 0.5rem;
}

.version-list{
  /* min-height: calc(100vh - 3rem); */
}

.load-wrap{
  /* min-height: calc(100vh - 1rem); */
  min-height: calc(100vh - 3.5rem);
}

.version-load-more{
  position: relative;
  /* min-height: calc(100vh - 6rem); */
  min-height: calc(100vh - 3.5rem);
  /* padding: 1rem; */
  /* padding-bottom: 2.5rem; */
}

.version-num {
  color: #575b60;
  font-size: 1rem;
  padding-bottom: 1rem;
}

.version-time {
  font-size: 0.9rem;
  color: #7a7d81;
  background: #fff;
}

.version-content {
  line-height: 1.5rem;
  color: #7a7d81;
  text-align: justify;
  font-size: 0.9rem;
  background: #fff;
}

.add-btn-wrap{
  /* position: fixed; */
  /* top: 1rem; */
  background: #fff;
  text-align: center;
  margin-bottom: 1rem;
}

/* .add-btn-wrap{
  position: fixed;
  text-align: center;
  bottom: .5rem;
  left: 50%;
  transform: translateX(-50%);
} */

.add-btn{
  display: inline-block;
  height: 1.5rem;
  line-height: 1.5rem;
  color: #3296fa;
  /* padding-left: 1rem; */
}
</style>

