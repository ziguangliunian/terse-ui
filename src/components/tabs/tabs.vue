<template>
    <div :class="['terse-tabs','terse-tabs--'+direction]">
        <div class="title-wrapper" v-if="tabList.length" ref="titleWrapper">
            <span :class="['title',{active:item.name===value},{'is-disable':item.disabled}]"
                  v-for="(item,index) of tabList"
                  :key="item.name"
                  @click="handleTitleClick(item,$event)">
                {{item.label}}
                <i class="iconfont icon-cross" v-if="showDelete" @click.stop="remove(item,index)"></i>
            </span>
        </div>
        <div class="line" ref="line"></div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: "terse-tabs",
    methods: {
      init() {
        const arr = []
        this.$slots && this.$slots.default && this.$slots.default.forEach(vNode => {
          const options = vNode.componentOptions
          if (options.tag === 'terse-tab-pane') {
            const {name, label, disabled} = vNode.child
            arr.push({name, label, disabled})
            if (name === this.value) {
              vNode.child.active = true
            }
          }
        })
        this.tabList = arr
      },
      line() {
        const spans = this.$refs.titleWrapper.querySelectorAll('span')
        const index = this.tabList.findIndex(item => item.name === this.value)
        if (index !== -1) {
          const {left, width, bottom, height, top} = spans[index].getBoundingClientRect();
          const line = this.$refs.line
          if (this.direction === 'vertical') {
            line.style.left = left + 'px'
            line.style.width = width + 'px'
            line.style.top = bottom + 'px'
          } else if (this.direction === 'horizontal') {
            line.style.left = left + width + 'px'
            line.style.top = top + 'px'
            line.style.height = height + 'px'
          }
        }
      },
      handleTitleClick(item, e) {
        if (!item.disabled) {
          this.events.$emit('title-click', item.name)
          this.$emit('input', item.name)
          this.$emit('change', item, e)
          this.$nextTick(this.line)
        }
      },
      remove(item, index) {
        let i
        if (item.name === this.value) {
          if (index === 0 && this.tabList.length > 1) {
            i = 0
          } else {
            i = index - 1
          }
        }
        this.tabList.splice(index, 1)
        this.events.$emit('remove', item.name)
        if (!this.tabList.length) {
          this.$destroy()
          this.$el.parentNode.removeChild(this.$el)
          return
        }
        if (item.name === this.value) {
          this.$emit('input', this.tabList[i].name)
          this.events.$emit('title-click', this.tabList[i].name)
        }
        this.$nextTick(this.line)

      }

    },
    props: {
      value: {
        type: String,
        required: true
      },
      direction: {
        type: String,
        default: 'vertical',
        validator(value) {
          return ['vertical', 'horizontal'].includes(value)
        }
      },
      showDelete: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tabList: [],
        events: new Vue
      }
    },
    provide() {
      return {
        events: this.events
      }
    },
    mounted() {
      this.init()
      this.$nextTick(this.line)
    },

  }
</script>

<style scoped lang="less">
    .terse-tabs {
        display: flex;

        .title-wrapper {
            .title {
                margin: 0 10px;
                cursor: pointer;

                &.active {
                    color: #409eff;
                }

                &.is-disable {
                    color: #ccc;
                    cursor: not-allowed
                }
            }

            .icon-cross {
                cursor: pointer;


            }
        }

        .line {
            border-top: 2px solid #409eff;
            position: absolute;
            transition: left .3s cubic-bezier(1, -0.66, 0, 1.27),
            width .3s cubic-bezier(1, -0.66, 0, 1.27),
            height .3s cubic-bezier(1, -0.66, 0, 1.27);

        }

        &--vertical {
            flex-direction: column;

            .line {
                margin-top: 2px;
            }
        }

        &--horizontal {
            .title-wrapper {
                display: flex;
                flex-direction: column;

                .title {
                    padding: 10px 15px;
                }
            }

            .line {
                border-top: 0;
                width: 2px;
                background: #409eff;
            }

            .content {
                flex: 1
            }
        }
    }
</style>