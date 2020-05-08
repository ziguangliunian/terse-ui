<template>
    <transition name="drawer-fade" appear
                @after-enter="afterEnter"
                @after-leave="afterLeave">
        <div :class="['terse-drawer','terse-drawer--'+direction]"
             v-show="visiable">
            <div class="terse-drawer__mstk"
                 @click="closeDrawer"/>
            <div class="terse-drawer__content"
                 :style="contentStyle">
                <p v-if="title&&!$slots.default"
                   class="content__title">
                    {{title}}
                </p>
                <p class="content__title" v-else>
                    <slot name="title"></slot>
                </p>
                <div class="content__body">
                    <slot></slot>
                </div>
                <i class="icon-cross iconfont"
                   v-if="showClose"
                   @click="closeDrawer"/>
            </div>
        </div>
    </transition>
</template>

<script>
  export default {
    name: "terse-drawer",
    props: {
      size: {
        type: [Number, String],
        default: '30%'
      },
      title: {
        type: String
      },
      direction: {
        type: String,
        default: 'right',
        validator(value) {
          return ['right', 'top', 'bottom', 'left'].includes(value)
        }
      },
      visiable: {
        type: Boolean,
        default: false
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
    computed: {
      contentStyle() {
        const direction = this.direction
        let lengthInfo
        if (direction === 'right' || direction === 'left') {
          lengthInfo = typeof this.size === 'number' ? {
            "width": this.size + 'px'
          } : {'width': this.size}
        } else if (direction === 'top' || direction === 'bottom') {
          lengthInfo = typeof this.size === 'number' ? {
            "height": this.size + 'px',
            'width': "100%"
          } : {'height': this.size, 'width': '100%'}
        }
        if (direction === 'right') {
          return {...lengthInfo, top: 0, right: 0}
        } else if (direction === 'left') {
          return {...lengthInfo, left: 0, top: 0}
        } else if (direction === 'top') {
          return {...lengthInfo, top: 0, right: 0}
        } else if (direction === 'bottom') {
          return {...lengthInfo, bottom: 0, right: 0}
        }


      }
    },
    watch: {
      visiable(value) {
        if (value) {
          document.body.style.overflow = 'hidden'
          this.closed = false
          this.$emit('open')
        } else {
          document.body.style.overflow = ''
          if (this.closed) {
            this.$emit('close')
          }
        }
      }
    },
    methods: {
      closeDrawer() {
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
      }

    }
  }
</script>

<style scoped lang="less">
    .drawer-fade-enter.terse-drawer--right, .drawer-fade-leave-to.terse-drawer--right {
        opacity: 0;
        transform: translateX(100%);
    }

    .drawer-fade-enter.terse-drawer--left, .drawer-fade-leave-to.terse-drawer--left {
        opacity: 0;
        transform: translateX(-100%);
    }

    .drawer-fade-enter.terse-drawer--top, .drawer-fade-leave-to.terse-drawer--top {
        opacity: 0;
        transform: translateY(-100%);
    }

    .drawer-fade-enter.terse-drawer--bottom, .drawer-fade-leave-to.terse-drawer--bottom {
        opacity: 0;
        transform: translateY(100%);
    }

    .terse-drawer {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 200;
        transition: opacity .3s, transform .3s;

        .terse-drawer__mstk {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background: rgba(0, 0, 0, 0.4);
        }

        .terse-drawer__content {
            height: 100%;
            position: absolute;
            background: #fff;
            padding: 20px;
            box-sizing: border-box;

            .content__title {
                padding: 15px 0;
                font-size: 18px;
                font-weight: bold;
                margin: 0;
            }

            .content__body {
                padding: 15px 0;
            }

            .icon-cross {
                position: absolute;
                right: 10px;
                top: 10px;
                cursor: pointer;
                font-size: 20px;
            }
        }
    }
</style>