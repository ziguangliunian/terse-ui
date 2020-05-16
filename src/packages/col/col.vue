<template>
    <div class="terse-col" :class="colWidth" :style="gutterStyle">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "terse-col",
    props: {
      span: {
        type: Number,
        validator(value) {
          return (value >= 1 && value <= 24)
        },
        default: 24
      },
      offset: {
        type: Number,
        default: 0,
        validator(value) {
          return (value >= 0 && value <= 24)
        },
      }
    },
    data() {
      return {
        gutter: 0
      }
    },
    inject: ['row'],
    mounted() {
      this.gutter = this.row.gutter
    },
    computed: {
      colWidth() {
        const arr = []
        if (this.span) {
          arr.push('terse-col-width--' + this.span)
        }
        if (this.offset) {
          arr.push('terse-col-offset--' + this.offset)
        }
        return arr
      },
      gutterStyle() {
        if (this.gutter) {
          return {'padding': ` 0  ${this.gutter / 2}px`}
        }
      }
    }
  }
</script>

<style scoped lang="less">
    .terse-col-width-change(@index) when (@index<=24) {
        .terse-col-width--@{index} {
            width: @index/24*100%;
        }
        .terse-col-width-change(@index+1)
    }

    .terse-col-offset-change(@index) when (@index<=24) {
        .terse-col-offset--@{index} {
            margin-left: @index/24*100%;
        }
        .terse-col-offset-change(@index+1)
    }

    .terse-col {
        overflow: hidden;
        box-sizing: border-box;
    }

    .terse-col-width-change(1);
    .terse-col-offset-change(1);

</style>