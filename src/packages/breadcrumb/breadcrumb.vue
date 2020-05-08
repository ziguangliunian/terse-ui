<template>
    <div class="terse-breadcrumb">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "terse-breadcrumb",
    provide() {
      return {
        breadcrumb: this
      }
    },
    props: {
      separator: {
        type: String,
        default: '/'
      }
    }
  }
</script>

<style scoped lang="less">
.terse-breadcrumb{
    font-size: 14px;
    line-height: 1;
}
</style>