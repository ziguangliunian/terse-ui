<template>
    <div :class="['terse-card','terse-card__shadow--'+shadow]">
        <div class="terse-card__title" v-if="title&&!$slots.title">
            {{title}}
        </div>
        <div class="terse-card__title" v-if="$slots.title">
            <slot name="title"></slot>
        </div>
        <div class="terse-card__body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: "terse-card",
    props: {
      shadow: {
        type: String,
        default: 'always',
        validator(value) {
          return ['always', 'hover', 'never'].includes(value)
        }
      },
      title: {
        type: String
      }
    }
  }
</script>

<style scoped lang="less">
    .terse-card {
        border-radius: 4px;
        border: 1px solid #ebeef5;
        background-color: #fff;
        overflow: hidden;
        color: #303133;
        transition: .3s;
        box-sizing: border-box;

        .terse-card__title {
            box-sizing: border-box;
            border-bottom: 1px solid #ebeef5;
            padding: 10px;
        }

        .terse-card__body {
            box-sizing: border-box;
            padding: 20px;
        }

        &.terse-card__shadow--always {
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        }

        &.terse-card__shadow--never {
        }

        &.terse-card__shadow--hover {
            cursor: pointer;
            transition: box-shadow .3s;

            &:hover {
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
            }
        }
    }

</style>