<template>
    <terse-row>
        <terse-col :span="24">
            <div class="wrapper bg-dark"></div>
        </terse-col>
    </terse-row>
</template>

<script>
  export default {
    data() {
      return {
        active: '1'
      }
    },
  }
</script>

<style scoped>
.bg-dark{
    height: 100px;
    background: salmon;
}
</style>