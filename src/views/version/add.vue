<template>
  <div class="add">
    <mt-field
      label="版本号"
      placeholder="请输入版本号"
      :state="numState"
      @blur.native.capture="validNum"
      v-model="num"
    ></mt-field>
    <mt-field
      label="版本内容"
      placeholder="请输入版本内容"
      :state="contentState"
      @blur.native.capture="validContent"
      type="textarea"
      rows="4"
      v-model="content"
    ></mt-field>
    <mt-button type="primary" size="large" class="save-btn" @click="save">保存</mt-button>
  </div>
</template>
<script>
import { setTitle } from "@/utils";
import versionApi from "@/api/version";
export default {
  name: "version.add",
  data() {
    return {
      num: "",
      content: "",
      numState: "",
      contentState: "",
      moduleFlag: ""
    };
  },
  created() {
    this.setTitle();
    this.moduleFlag = sessionStorage.getItem("moduleFlag");
  },
  methods: {
    validNum() {
      if (!this.num) {
        this.numState = "error";
      } else {
        this.numState = "";
      }
    },
    validContent() {
      if (!this.content) {
        this.contentState = "error";
      } else {
        this.contentState = "";
      }
    },
    setTitle() {
      setTitle("新增版本");
    },
    save() {
      if (!this.num) {
        return this.$toast({
          message: "版本号不能为空",
          duration: 2000
        });
      }

      if (!this.content) {
        return this.$toast({
          message: "版本内容不能为空",
          duration: 2000
        });
      }
      versionApi
        .addVersion({
          versionNum: this.Trim(this.num),
          content: this.Trim(this.content),
          moduleFlag: this.moduleFlag
        })
        .then(result => {
          this.$toast({
            message: "添加版本成功",
            duration: 2000
          });
          this.$router.push("/version");
        })
        .catch(err => {
          this.$toast({
            message: err.message || "添加版本失败",
            duration: 2000
          });
        });
    },
    Trim(str) {
      //str表示要转换的字符串
      if (str == undefined) {
      } else {
        return String(str).replace(/\n|\r\n/g, "<br/>");
      }
    }
  }
};
</script>
<style>
.add {
  padding: 0.5rem;
  min-height: 100vh;
  background: #fff;
}

.save-btn {
  margin-top: 5rem;
}
</style>


