<template>
    <a :href="href"
       :class="['terse-link','terse-link--'+type,
    {'is-disabled':disabled},{'no-underline':!underline}]"
       @click="linkClick">
        <slot></slot>
    </a>
</template>

<script>
  export default {
    name: "terse-link",
    props: {
      href: String,
      type: {
        type: String,
        validator(value) {
          return ['primary', 'danger', 'success', 'info', 'warning'].includes(value)
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      underline: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      linkClick(e) {
        if (this.disabled) {
          return e.preventDefault()
        }
        if (!this.href) {
          this.$emit('click', e)
        }
      }
    }
  }
</script>

<style scoped lang="less">
    @import "./src/assets/variable";

    .terse-link {
        cursor: pointer;
        text-decoration: none;
        box-sizing: border-box;

        &:hover {
            border-bottom: 1px solid @theme-color-primary;
        }

        &.is-disabled {
            color: #c0c4cc;
            cursor: not-allowed;

            &:hover {
                border-bottom: 0;
            }
        }

        &--primary {
            color: @theme-color-primary;

            &:hover {
                border-bottom: 1px solid @theme-color-primary;
            }

            &.is-disabled {
                color: #a0cfff;
            }
        }

        &--danger {
            color: @theme-color-danger;

            &:hover {
                border-bottom: 1px solid @theme-color-danger;
            }

            &.is-disabled {
                color: #fab6b6;
            }
        }

        &--success {
            color: @theme-color-success;

            &:hover {
                border-bottom: 1px solid @theme-color-success;
            }

            &.is-disabled {
                color: #b3e19d;
            }
        }

        &--warning {
            color: @theme-color-warning;

            &:hover {
                border-bottom: 1px solid @theme-color-warning;
            }

            &.is-disabled {
                color: #f3d19e;
            }
        }

        &--info {
            color: @theme-color-info;

            &:hover {
                border-bottom: 1px solid @theme-color-info;
            }

            &.is-disabled {
                color: #c8c9cc;
            }
        }

        &.no-underline {
            &:hover {
                border-bottom: 0;
            }
        }
    }
</style>