<template functional>
    <div :class="['terse-divider','terse-divider--'+props.direction]">
        <div v-if="$slots.default&&props.direction==='horizontal'"
             :class="['terse-divider__label','terse-divider__label--'+props.position]">
            <slot></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: "terse-divider",
    props: {
      direction: {
        type: String,
        default: 'horizontal',
        validator(value) {
          return ['horizontal', 'vertical'].includes(value)
        }
      },
      position: {
        default: 'center',
        type: String,
        validator(value) {
          return ['center', 'left', 'right'].includes(value)
        }
      }

    }
  }
</script>

<style scoped lang="less">
    .terse-divider {
        background-color: #DCDFE6;
        position: relative;

        .terse-divider__label {
            position: absolute;
            background: #fff;
            padding: 0 20px;

            &--center {
                left: 50%;
                transform: translate(-50%, -50%);
            }

            &--left {
                left: 100px;
                transform: translateY(-50%);
            }

            &--right {
                right: 100px;
                transform: translateY(-50%);

            }
        }

        &--horizontal {
            width: 100%;
            height: 1px;
            margin: 20px 0;
        }

        &--vertical {
            width: 1px;
            height: 1em;
            margin: 0 1em;
            display: inline-block;
            vertical-align: middle;
        }
    }
</style>