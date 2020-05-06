<template>
    <div id="app">
        <button @click="handleClick">点击</button>
    </div>
</template>

<script>
  import Message from "./components/message";

  export default {
    name: 'App',
    methods: {
      handleClick() {
        Message({duration: 0, message: '这是一条信息',showClose:true})
      }
    }

  }
</script>

<style>

</style>
