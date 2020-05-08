<template>
    <main class="terse-main">
        <slot></slot>
    </main>
</template>

<script>
  export default {
    name: "li-main"
  }
</script>

<style scoped lang="less">
    .li-main {
        background-color: #e9eef3;
        color: #333;
        text-align: center;
        line-height: 200px;
        flex: 1
    }
</style>