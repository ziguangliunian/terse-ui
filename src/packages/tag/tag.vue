<template>
    <transition name="tag-fade" @after-leave="afterLeave">
        <span ref="tag"
              :class="['terse-tag','terse-tag--'+type,'terse-tag--'+theme]"
              v-show="visiable">
       <span class="terse-tag__label">
           <slot></slot>
       </span>
        <i class="iconfont icon-cross" v-if="showClose" @click="close"></i>
    </span>
    </transition>
</template>

<script>
  export default {
    name: "terse-tag",
    props: {
      type: {
        type: String,
        default: 'primary',
        validator(value) {
          return ['primary', 'danger', 'success', 'warning', 'info'].includes(value)
        }
      },
      showClose: {
        type: Boolean,
        default: false
      },
      theme: {
        type: String,
        validator(value) {
          return ['plain', 'dark'].includes(value)
        }
      },

    },
    data() {
      return {
        visiable: true,
        closeAble: false
      }
    },
    watch: {
      closeAble(value) {
        if (value) {
          this.visiable = false
        }
      }
    },
    methods: {
      close() {
        this.closeAble = true
      },
      afterLeave() {
        this.$emit('closed')
        this.$destroy()
        this.$el.parentNode.removeChild(this.$el)
      }
    }
  }
</script>

<style lang="less" scoped>
    @import "../assets/variable";

    .tag-fade-enter, .tag-fade-leave-to {
        opacity: 0;
    }

    @typeList: primary, danger, success, warning, info;
    @themeColor: @theme-color-primary, @theme-color-danger, @theme-color-success, @theme-color-warning, @theme-color-info;
    .tag-status-change(@type,@color,@bdColor,@bgColor) {
        .terse-tag--@{type} {
            color: @color;
            background-color: @bgColor;
            border-color: @bdColor;

            &:hover {
                .icon-cross {
                    background: @color;
                    color: #fff;
                }
            }
        }
    }

    .tag-theme-plain(@index,@type,@theme) when (@index<=length(@typeList)) {
        .terse-tag--@{type}.terse-tag--@{theme} {
            color: extract(@themeColor, @index);
            background: #fff;
        }
        .tag-theme-plain(@index+1, extract(@typeList,@index+1), @theme)
    }

    .tag-theme-dark(@index,@type,@theme) when (@index<=length(@typeList)) {
        .terse-tag--@{type}.terse-tag--@{theme} {
            color: #fff;
            background: extract(@themeColor, @index);
        }
        .tag-theme-dark(@index+1, extract(@typeList,@index+1), @theme)
    }

    .terse-tag {
        background-color: #ecf5ff;
        display: inline-flex;
        height: 32px;
        padding: 0 10px;
        line-height: 30px;
        font-size: 12px;
        border: 1px solid #d9ecff;
        border-radius: 4px;
        box-sizing: border-box;
        white-space: nowrap;
        align-items: center;
        transition: opacity .3s;

        .icon-cross {
            cursor: pointer;
            border-radius: 50%;
            line-height: 16px;
        }

        .terse-tag__label {
            padding-right: 5px;
        }
    }

    .tag-status-change(primary, @theme-color-primary, #d9ecff, #ecf5ff);
    .tag-status-change(success, @theme-color-success, #e1f3d8, #f0f9eb);
    .tag-status-change(danger, @theme-color-danger, #fde2e2, #fef0f0);
    .tag-status-change(warning, @theme-color-warning, #faecd8, #fdf6ec);
    .tag-status-change(info, @theme-color-info, #e9e9eb, #f4f4f5);
    .tag-theme-plain(1, primary, plain);
    .tag-theme-dark(1, primary, dark);

</style>