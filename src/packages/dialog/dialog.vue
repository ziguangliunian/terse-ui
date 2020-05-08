<template>
    <transition name="dialog-fade" appear
                @after-enter="afterEnter"
                @after-leave="afterLeave">
        <div class="terse-dialog" v-show="visiable">
            <div class="terse-dialog__mstk"
                 @click="closeDialog"/>
            <div class="terse-dialog__content" :style="{width}">
                <i class="iconfont icon-cross"
                   @click.stop="closeDialog"
                   v-if="showClose"/>
                <p class="content__title" v-if="title&&!$slots.title">
                    {{title}}
                </p>
                <p v-if="$slots.title" class="content__title">
                    <slot name="title"></slot>
                </p>
                <div class="content__body">
                    <slot></slot>
                </div>
                <div class="content__footer" v-if="$slots.footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
  export default {
    name: "terse-dialog",
    props: {
      visiable: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
      },
      width: {
        type: String,
        default: '50%'
      },
      showClose: {
        type: Boolean,
        default: true
      },
      beforeClose: {
        type: Function
      }
    },
    data() {
      return {
        closed: true
      }
    },
    methods: {
      closeDialog() {
        if (typeof this.beforeClose === 'function') {
          this.beforeClose(this.hide)
        } else {
          this.hide()
        }
      },
      hide(cancel) {
        if (cancel !== false) {
          this.closed = true
          this.$emit('update:visiable', false)
        }
      },
      afterEnter() {
        this.$emit('opend')
      },
      afterLeave() {
        this.$emit('closed')
      },
    },
    watch: {
      visiable(value) {
        if (value) {
          this.closed = false
          this.$emit('open')
          document.body.style.overflow = 'hidden'
        } else {
          document.body.style.overflow = ''
          if (this.closed) {
            this.$emit('close')
          }
        }
      }
    },
  }
</script>

<style scoped lang="less">
    .dialog-fade-enter, .dialog-fade-leave-to {
        opacity: 0;
        transform: translateY(-100%);
    }

    .terse-dialog {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        transition: opacity .3s, transform .3s;

        .terse-dialog__mstk {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background: rgba(0, 0, 0, 0.3);
        }

        .terse-dialog__content {
            position: absolute;
            width: 50%;
            left: 50%;
            top: 25%;
            transform: translate(-50%);
            background: #fff;

            .icon-cross {
                position: absolute;
                right: 10px;
                top: 15px;
                cursor: pointer;
            }

            .content__title {
                padding: 10px 20px 10px;
                font-size: 18px;
                margin: 0;
            }

            .content__body {
                padding: 20px 20px 10px;
            }

            .content__footer {
                padding: 20px 20px 10px;
                display: flex;
            }

        }
    }
</style>