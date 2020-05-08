<template>
    <button v-if="$slots.default"
            :class="['terse-btn',{'terse-btn--is-disable':disabled},'terse-btn--'+type]"
            :disabled="disabled"
            @click="handleClick">
        <i :class="['iconfont',icon]" v-if="icon&&!loading"></i>
        <i class="iconfont icon-jiazai loading" v-if="loading"></i>
        <slot></slot>
    </button>
</template>

<script>
  export default {
    name: "terse-button",
    props: {
      icon: String,
      loading: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        validator(value) {
          return ['primary', 'danger', 'success', 'warning', 'info'].includes(value)
        }
      }
    },
    methods: {
      handleClick(e) {
        if (!this.disabled) {
          this.$emit('click', e)
        }
      }
    }
  }
</script>

<style scoped lang="less">
    @import "./index.less";

    @keyframes rotate {
        form {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .terse-btn {
        line-height: 32px;
        font-size: 16px;
        display: inline-flex;
        vertical-align: middle;
        border: 1px solid #999;
        background: #fff;
        border-radius: 4px;
        color: #333;
        padding: 0 1em;
        cursor: pointer;

        &:focus {
            outline: none;
        }

        &:hover {
            border-color: #666666;
        }

        &--is-disable {
            cursor: not-allowed;
        }

        .iconfont {
            padding: 0 .2em;
        }

        .loading {
            animation: rotate 3s linear infinite;
        }
    }

    .btn-status-change(danger, #f56c6c, #f78989);
    .btn-status-change(primary, #409eff, #409eff);
    .btn-status-change(success, #67c23a, #85ce61);
    .btn-status-change(warning, #e6a23c, #ebb563);
    .btn-status-change(info, #909399, #a6a9ad);
</style>