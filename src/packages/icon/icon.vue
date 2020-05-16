<template>
    <i :class="['iconfont',name]" :style="{color,fontSize:size+'px'}"></i>
</template>

<script>
  export default {
    name: "terse-icon",
    props: {
      name: {
        type: String,
        required: true
      },
      color: {
        type: String,
        default: '#000'
      },
      size: {
        type: Number,
        default: 16,
        validator(value) {
          return value >= 10
        }
      }
    }
  }
</script>

<style scoped>

</style>