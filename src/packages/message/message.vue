<template>
    <transition name="message-fade" appear @after-leave="afterLeave">
        <div class="terse-message"
             :class="['terse-message--'+type]"
             v-show="isVisiable"
             :style="{top:verticalOffset+'px'}">
            <i class="iconfont icon-warn-line"></i>
            <p class="content">{{message}}</p>
            <i class="iconfont icon-cross"
               style="cursor: pointer;"
               v-if="showClose"
               @click="close"/>
        </div>
    </transition>
</template>

<script>
  export default {
    name: "li-message",
    data() {
      return {
        message: '',
        isVisiable: false,
        closed: false,
        showClose: false,
        duration: 3000,
        timer: null,
        onClose: null,
        type: 'info',
        verticalOffset: 20
      }
    },
    methods: {

      startTimer() {
        if (this.duration) {
          this.timer = setTimeout(this.close, this.duration)
        }
      },
      keydown(e) {
        if (e.keyCode === 27 || e.keyCode === 46) {
          this.close()
        }
      },
      close() {
        if (!this.closed) {
          this.closed = true
          typeof this.onClose === 'function' && this.onClose()
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
          this.isVisiable = false
        }
      }
    },

    mounted() {
      this.startTimer()
      document.addEventListener('keydown', this.keydown)
      this.$on('hook:beforeDestory', () => {
        clearTimeout(this.timer)
        document.removeEventListener('keydown', this.keydwon)
      })
    }

  }
</script>

<style scoped lang="less">

    .message-fade-enter, .message-fade-leave-to {
        opacity: 0;
    }

    .terse-message {
        min-width: 380px;
        padding: 15px 15px;
        position: fixed;
        left: 50%;
        top: 20px;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        border-radius: 8px;
        border: 1px solid #EBEEF5;
        background-color: #edf2fc;
        transition: opacity .5s, top .3s;
        z-index: 200;

        .content {
            margin: 0;
            padding: 0 10px;
            flex: 1
        }

    }

    .terse-message--success {
        color: #67c23a;
        border-color: #67c23a;
    }

    .terse-message--danger {
        color: #f56c6c;
        border-color: #f56c6c;
    }

    .terse-message--warning {
        color: #e6a23c;
        border-color: #e6a23c;
    }

    .terse-message--info {
        color: #909399;
    }
</style>