<template>
    <div class="terse-radio-group">
        <div class="terse-radio-group__content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: "terse-radio-group",
    props: {
      value: {
        type: [Number, String]
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      if (this.disabled) {
        this.$slots.default && this.$slots.default.forEach(vNode => {
          const tag = vNode.componentOptions.tag
          if (tag === 'terse-radio-button' || tag === 'terse-radio') {
            vNode.child.notAllowed = true
          }
        })
      }
    },
  }
</script>

<style scoped lang="less">
    .terse-radio-group__content {
        display: flex;

        .terse-radio-button {
            &:first-child {
                border-top-left-radius: 8px;
                border-bottom-left-radius: 8px;
            }

            &:last-child {
                border-top-right-radius: 8px;
                border-bottom-right-radius: 8px;
            }

            &:not(:first-child) {
                margin-left: -1px;
            }
        }
    }
</style>