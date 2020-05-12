<template>
    <div class="terse-row" :style="{marginLeft:-gutter/2+'px',marginRight:-gutter/2+'px'}">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "terse-row",
    props:{
      gutter:{
        type:Number,
        default:0,
        validator(value){
          return value>=0
        }
      }
    },
    provide(){
      return{
        row:this
      }
    }

  }
</script>

<style scoped lang="less">
    .terse-row{
        display: flex;
        flex-wrap: wrap;
        box-sizing:border-box;
    }

</style>