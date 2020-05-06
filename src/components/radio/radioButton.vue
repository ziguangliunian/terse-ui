<template>
    <label class="terse-radio-button"
           :class="{'is-checked':model===label,'is-disabled': notAllowed}">
        <slot></slot>
        <template v-if="!$slots.default">{{label}}</template>
        <input type="radio"
               class="terse-radio-button__original"
               :value="label"
               :disabled="notAllowed"
               :name="name"
               v-model="model"
               ref="radio">
    </label>
</template>

<script>
  export default {
    name: "terse-radio-button",
    props: {
      label: {
        required: true,
        type: [Number, String, Boolean]
      },
      name: {
        type: String
      },
      value: {
        type: [Number, Boolean, String]
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        notAllowed: this.disabled
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
          } else {
            this.$emit('input', value)
          }
          this.$nextTick(() => {
            this.$refs.radio.checked = this.model === this.label
          })
        }

      },
      isGroup() {
        let parent = this.$parent
        while (parent) {
          if (parent.$options.name === 'terse-radio-group') {
            this._radioGroup = parent
            return true
          } else {
            parent = parent.$parent
          }
        }
        return false
      }
    },
    mounted() {
      this.$refs.radio && (this.$refs.radio.checked = this.model === this.label)
    }
  }
</script>

<style scoped lang="less">
    .terse-radio-button {
        border: 1px solid #DCDFE6;
        position: relative;
        line-height: 1;
        padding: 5px 10px;
        text-align: center;
        background: #fff;
        cursor: pointer;

        .terse-radio-button__original {
            position: absolute;
            left: 0;
            top: 0;
            outline: none;
            opacity: 0;
        }

        &.is-checked {
            background: #409eff;
            color: #fff;

            &.is-disabled {
                cursor: not-allowed;
                background-color: #f5f7fa;
                /*color: #e4e7ed;*/
            }
        }

        &.is-disabled {
            cursor: not-allowed;
            color: #e4e7ed;
        }
    }
</style>