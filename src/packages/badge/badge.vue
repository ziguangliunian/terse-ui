<template>
    <span class="terse-badge">
        <slot></slot>
        <sup v-if="show&&(isDot||context===0||context)"
             :class="['terse-badge__sup','terse-badge__sup--'+type,
             {'is-fixed':$slots.default,'is-dot':isDot}]"
             v-text="context"/>
    </span>
</template>

<script>
  export default {
    name: "terse-badge",
    props: {
      show: {
        type: Boolean,
        default: true
      },
      type: {
        type: String,
        default: 'danger',
        validator(value) {
          return ['danger', 'success', 'warning'].includes(value)
        }
      },
      max: {
        type: Number,
        default: Infinity
      },
      value: {
        type: [Number, String]
      },
      isDot: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      context() {
        if (this.isDot) return
        if (typeof this.value === 'number' && typeof this.max === 'number' && this.value > this.max) {
          return this.value + '+'
        }
        return this.value
      }
    }
  }
</script>

<style scoped lang="less">
    @import "../assets/variable";

    .terse-badge {
        position: relative;
        vertical-align: middle;
        display: inline-block;
        padding: 10px 0;

        .terse-badge__sup {
            display: inline-block;
            padding: 0 6px;
            border-radius: 10px;
            font-size: 12px;
            line-height: 18px;
            text-align: center;
            white-space: nowrap;

            &.is-fixed {
                position: absolute;
                right: 10px;
                top: 2px;
                transform: translate(100%);

                &.is-dot {
                    right: -3px;
                    transform: translateY(50%);

                }
            }

            &.is-dot {
                width: 8px;
                height: 8px;
                padding: 0;
                transform: translateX(100%);
                position: absolute;
                border-radius: 50%;
                background: @theme-color-danger;
            }

            &--danger {
                color: #fff;
                background: @theme-color-danger;
            }

            &--warning {
                color: #fff;
                background: @theme-color-warning;
            }

            &--success {
                color: #fff;
                background: @theme-color-success;
            }
        }

    }
</style>