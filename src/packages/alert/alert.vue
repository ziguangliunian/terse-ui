<template>
    <transition name="alert-fade" @after-leave="afterLeave">
        <div :class="['terse-alert','terse-alert--'+type]" v-show="visiable">
            <p v-if="title&&!$slots.title" class="terse-alert__title">
                {{title}}
            </p>
            <p v-if="$slots.title" class="terse-alert__title">
                <slot name="title"></slot>
            </p>
            <p v-if="description&&!$slots.default" class="terse-alert__description">
                {{description}}
            </p>
            <p v-if="$slots.default" class="terse-alert__description">
                <slot></slot>
            </p>
            <i class="icon-cross iconfont terse-alert__close" @click="close" v-if="showClose&&!closeText"></i>
            <span class="terse-alert__close" @click="close" v-if="showClose&&closeText">
                {{closeText}}
            </span>
        </div>
    </transition>
</template>


<script>
  export default {
    name: "terse-alert",
    props: {
      title: {
        type: String
      },
      closeText: {
        type: String
      },
      showClose: {
        type: Boolean,
        default: true
      },
      description: {
        type: String
      },
      type: {
        type: String,
        default: 'info',
        validator(value) {
          return ['success', 'danger', 'warning', 'info'].includes(value)
        }
      },
    },
    data() {
      return {
        visiable: true
      }
    },
    methods: {
      afterLeave() {
        this.$emit('closed')
        this.$destroy()
        this.$el.parentNode.removeChild(this.$el)
        document.body.style.overflow = ''
      },
      close() {
        this.visiable = false
        document.body.style.overflow = 'hidden'
      }
    }
  }
</script>

<style scoped lang="less">
    @import "../assets/variable";

    .alert-fade-enter, .alert-fade-leave-to {
        opacity: 0;
        transform: translateX(100%);
    }

    .terse-alert {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 8px 30px 16px 8px;
        border-radius: 4px;
        border: 1px solid #EBEEF5;
        position: relative;
        overflow: hidden;
        transition: opacity .3s, transform .3s;

        .terse-alert__title, .terse-alert__description {
            margin: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 16px;
        }

        .terse-alert__description {
            font-size: 12px;
            margin-top: 10px;
        }

        .terse-alert__close {
            position: absolute;
            right: 10px;
            top: 10px;
            cursor: pointer;
        }

        &--info {
            background: #e9e9eb;
            color: @theme-color-info;
        }

        &--success {
            color: @theme-color-success;
            background: #e1f3d8;
        }

        &--danger {
            color: @theme-color-danger;
            background: #fde2e2;
        }

        &--warning {
            color: @theme-color-warning;
            background: #faecd8;
        }
    }
</style>