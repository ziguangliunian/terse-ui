<template>
    <aside class="terse-aside" :style="{width:width+'px'}">
        <slot></slot>
    </aside>
</template>

<script>
  export default {
    name: "terse-aside",
    props: {
      width: {
        default: 200,
        type: Number,
      }
    }
  }
</script>

<style scoped lang="less">
    .terse-aside {
        background-color: #d3dce6;
        text-align: center;
        line-height: 200px;
    }
</style>