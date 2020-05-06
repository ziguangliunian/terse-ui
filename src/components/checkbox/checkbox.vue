<template>
    <label class="terse-checkbox"
           :class="{'is-disabled':notAllowed,'is-checked':model}">
        <span class="terse-checkbox__inner">
            <input type="checkbox"
                   class="terse-checkbox__original"
                   ref="checkbox"
                   :disabled="notAllowed"
                   :value="label"
                   v-model="model"
                   :name="name"/>
        </span>
        <span class="terse-checkbox__label">
            <slot></slot>
            <template v-if="!$slots.default">{{label}}</template>
        </span>
    </label>
</template>

<script>
  export default {
    name: "terse-checkbox",
    props: {
      value: {
        type: Boolean
      },
      disabled: {
        type: Boolean,
        default: false
      },
      name: {
        type: String,
      },
      label: {
        type: [String, Number]
      }
    },
    computed: {
      model: {
        get() {
          if (!this.isGroup) {
            return this.value
          } else {
            return this._checkboxGroup.value.includes(this.label)
          }
        },
        set(value) {
          if (this.isGroup) {
            const list = [...this._checkboxGroup.value]
            const index = list.findIndex(item => item === this.label)
            if (index === -1) {
              list.push(this.label)
            } else {
              list.splice(index, 1)
            }
            this._checkboxGroup.$emit('input', list)
            this._checkboxGroup.$emit('change', list)
          } else {
            this.$emit('input', value)
            this.$emit('change', value)
          }
        }
      },
      isGroup() {
        let parent = this.$parent
        while (parent) {
          if (parent.$options.name !== 'terse-checkbox-group') {
            parent = parent.$parent
          } else {
            this._checkboxGroup = parent
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

<style scoped lang="less">
    .terse-checkbox {
        display: inline-flex;
        line-height: 1;
        align-items: center;
        cursor: pointer;

        .terse-checkbox__inner {
            position: relative;
            width: 14px;
            height: 14px;
            border: 1px solid #DCDFE6;
            background: #fff;

            .terse-checkbox__original {
                position: absolute;
                left: 0;
                top: 0;
                outline: none;
                z-index: -1;
                opacity: 0;
            }

            &:after {
                content: '';
                position: absolute;
                border: 1px solid #ffffff;
                border-left: 0;
                border-top: 0;
                height: 7px;
                width: 3px;
                left: 5px;
                top: 1px;
                transform: rotate(45deg);
                display: none;
            }

        }

        .terse-checkbox__label {
            padding: 0 10px;
        }

        &.is-checked {
            color: #409eff;

            .terse-checkbox__inner {
                background: #409eff;

                &:after {
                    display: block;
                }
            }

            &.is-disabled {
                .terse-checkbox__inner {
                    &:after {
                        border-color: #000;
                    }
                }
            }

        }

        &.is-disabled {
            color: #e4e7ed;
            cursor: not-allowed;

            .terse-checkbox__inner {
                background-color: #f5f7fa;
                border-color: #e4e7ed;
            }
        }
    }
</style>