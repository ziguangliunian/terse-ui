<template>
    <div class="terse-checkbox-group">
        <div class="terse-checkbox-group__content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: "terse-checkbox-group",
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      value: {
        type: Array,
        default() {
          return []
        },
        required: true
      }
    },
    mounted() {
      if (this.disabled) {
        this.$slots.default && this.$slots.default.forEach(vNode => {
          const tag = vNode.componentOptions&&vNode.componentOptions.tag
          if (tag === 'terse-checkbox') {
            vNode.child.notAllowed = true
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
    .terse-checkbox-group__content {
        display: flex;
        align-items: center;
    }
</style>