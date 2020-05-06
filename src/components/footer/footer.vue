<template>
    <footer class="terse-footer" :style="{height:height+'px'}">
        <slot></slot>
    </footer>
</template>

<script>
  export default {
    name: "terse-footer",
    props: {
      height: {
        default: 60,
        type: Number
      }
    }
  }
</script>

<style scoped lang="less">
    .terse-footer {
        background-color: #b3c0d1;
        color: #333;
        line-height: 60px;
        text-align: center;
    }
</style>