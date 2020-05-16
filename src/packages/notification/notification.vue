<template>
    <transition name="notification-fade" appear @after-leave="afterLeave">
        <div class="terse-notification"
             :class="['terse-notification--'+horizontal]"
             v-if="visiable"
             :style="{[vertical]:verticalOffset+'px',[horizontal]:0}">
            <p v-if="title" class="terse-notification__title">
                <i class="iconfont icon-warn-line"
                   :class="['icon-warn-line--'+type]"
                   v-if="type"/>
                {{title}}
            </p>
            <div class="terse-notification__message">{{message}}</div>
            <i class="iconfont icon-cross" v-if="showClose" @click="close"></i>
        </div>
    </transition>
</template>

<script>
  export default {
    name: "terse-notification",
    data() {
      return {
        title: '',
        message: '',
        visiable: false,
        duration: 3000,
        closed: false,
        showClose: true,
        onClose: null,
        verticalOffset: 20,
        timer: null,
        position: 'top-right',
        type: ''
      }
    },
    computed: {
      horizontal() {
        return this.position.indexOf('right') !== -1 ? 'right' : 'left'
      },
      vertical() {
        return this.position.indexOf('top') !== -1 ? 'top' : 'bottom'

      }
    },
    methods: {
      start() {
        if (this.duration) {
          setTimeout(this.close, this.duration)
        }
      },
      close() {
        if (!this.closed) {
          this.closed = true
          if (typeof this.onClose === 'function') {
            this.onClose()
          }
        }
      },
      afterLeave() {
        this.$destroy()
        document.body.removeChild(this.$el)
      }
    },
    watch: {
      closed(value) {
        if (value) {
          this.visiable = false
        }
      }
    },
    mounted() {
      this.start()
      this.$on('hook:beforeDestory', () => {
        clearTimeout(this.timer)
      })
    }
  }
</script>

<style scoped lang="less">
    @import "../assets/variable";

    .notification-fade-enter.terse-notification--left, .notification-fade-leave-to.terse-notification--left {
        opacity: 0;
        transform: translateX(-100%);
    }

    .notification-fade-enter.terse-notification--right, .notification-fade-leave-to.terse-notification--right {
        opacity: 0;
        transform: translateX(100%);
    }

    .terse-notification {
        width: 380px;
        overflow: hidden;
        padding: 20px;
        box-sizing: border-box;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        transition: opacity .3s, transform .3s, top .3s, bottom 0.3s;
        position: fixed;
        z-index: 200;
        background: #fff;

        .terse-notification__title {
            margin: 0;
            font-weight: bold;
            font-size: 18px;
            margin-bottom: 10px;

            .icon-warn-line {
                &--info {
                    color: @theme-color-info;
                }

                &--success {
                    color: @theme-color-success;
                }

                &--danger {
                    color: @theme-color-danger;
                }

                &--warning {
                    color: @theme-color-warning;
                }
            }
        }

        .icon-cross {
            position: absolute;
            right: 15px;
            top: 20px;
            cursor: pointer;
        }
    }

</style>