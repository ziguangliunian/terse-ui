<template>
    <label class="terse-radio"
           :class="{'is-checked':label===model,'is-disabled':notAllowed}">
        <span class="terse-radio__inner">
            <input type="radio"
                   :value="label"
                   v-model="model"
                   :disabled="notAllowed"
                   :name="name"
                   class="terse-radio__original"
                   ref="radio">
        </span>
        <span class="terse-radio__label">
            <slot></slot>
            <template v-if="!$slots.default">
                {{label}}
            </template>
        </span>
    </label>
</template>
<script>
  export default {
    name: 'terse-radio',
    props: {
      value: {
        type: [String, Number, Boolean],
      },
      label: {
        type: [String, Number, Boolean]
      },
      name: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      }

    },
    computed: {
      model: {
        get() {
          return this.isGroup ? this._radioGroup.value : this.value
        },
        set(value) {
          if (this.isGroup) {
            this._radioGroup.$emit('input', value)
            this._radioGroup.$emit('change', value)
          } else {
            this.$emit('input', value)
          }
        }
      },
      isGroup() {
        let parent = this.$parent
        while (parent) {
          if (parent.$options.name !== 'terse-radio-group') {
            parent = parent.$parent
          } else {
            this._radioGroup = parent
            return true
          }
        }
        return false
      }
    },
    data() {
      return {
        notAllowed: this.disabled
      }
    },
  }
</script>
<style lang="less" scoped>
    .terse-radio {
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        margin-right: 30px;
        -user-select: none;
        vertical-align:top;
        .terse-radio__inner {
            display: inline-block;
            box-sizing: border-box;
            width: 16px;
            height: 16px;
            border: 1px solid #dcdfe6;
            border-radius: 50%;
            background: #fff;
            transition: border-color .3s;
            position: relative;

            &:hover {
                border-color: #409eff;
            }

            &:after {
                content: '';
                position: absolute;
                width: 4px;
                height: 4px;
                border-radius: 50%;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                background: #fff;
            }

            .terse-radio__original {
                position: absolute;
                left: 0;
                top: 0;
                opacity: 0;
                outline: none;
                margin: 0;
                z-index: -1;
            }
        }

        .terse-radio__label {
            padding-left: 10px;
        }

        &.is-checked {
            .terse-radio__inner {
                background: #409eff;
                border-color: #409eff;
            }

            .terse-radio__label {
                color: #409eff;
            }

            &.is-disabled {
                .terse-radio__inner {
                    background-color: #f5f7fa;
                    border-color: #e4e7ed;

                    &:after {
                        background: #000;
                    }
                }

                .terse-radio__label {
                    color: #e4e7ed;
                }
            }
        }

        &.is-disabled {
            cursor: not-allowed;
            color: #e4e7ed;

            .terse-radio__inner {
                &:hover {
                    border-color: #dcdfe6;
                }
            }
        }
    }
</style>