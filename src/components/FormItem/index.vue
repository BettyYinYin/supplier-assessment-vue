<template>
  <div class="form-item">
    <span class="label">{{label}}</span>
    <input
      type="text"
      class="input"
      v-model="fakeVal"
      v-show="isSelect"
      @input="$emit('input', {val: fakeVal})"
    />
    <span class="input" @click="$emit('triggerSelect')" v-show="!isSelect">{{trueVal}}</span>
    <!-- <svg-icon iconClass="arrow-right"></svg-icon> -->
  </div>
</template>
<script>
export default {
  name: "form-item",
  props: {
    label: {
      type: String,
      required: true
    },
    trueVal: {
      type: String,
      default: ""
    },
    isSelect: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      fakeVal: ""
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.form-item {
  display: flex;
  font-size: 0.8rem;
  justify-content: space-around;
  padding: 1rem 0.5rem;
  .label {
    flex: 0 0 5rem;
  }
  .input {
    flex: 1;
  }
  .svg-icon {
    flex: 0 0 1.2rem;
  }
}
</style>