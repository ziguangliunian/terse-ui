<template>
    <div class="terse-container" :class="{isVertical}">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "terse-container",
    computed: {
      isVertical() {
        return this.$slots && this.$slots.default ? this.$slots.default.some(vNode => {
          const tag = vNode.componentOptions&&vNode.componentOptions.tag
          return tag === 'terse-header' || tag === 'terse-footer'
        }) : false
      }
    }
  }
</script>

<style scoped lang="less">
    .terse-container {
        display: flex;
        flex: 1;

        &.isVertical {
            flex-direction: column;
        }
    }
</style>