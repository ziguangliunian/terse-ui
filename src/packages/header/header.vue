<template>
    <header class="terse-header" :style="{height:height+'px'}">
        <slot></slot>
    </header>
</template>

<script>
  export default {
    name: "terse-header",
    props: {
      height: {
        type: Number,
        default: 60
      }
    }
  }
</script>

<style scoped lang="less">
    .terse-header {
        background-color: #b3c0d1;
        color: #333;
        line-height: 60px;
        text-align: center;
    }
</style>