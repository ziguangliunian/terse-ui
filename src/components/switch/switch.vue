<template>
    <div class="terse-switch" :class="{'is-checked':checked,'is-disabled':disabled}"
         @click.prevent="switchValue">
        <span class="el-switch__label" v-if="activeText" ref="left">{{activeText}}</span>
        <span class="terse-switch__core" ref="core" :style="{width:width+'px'}"></span>
        <span class="el-switch__label el-switch__label--right" ref="right" v-if="inactiveText">{{inactiveText}}</span>
        <input type="checkbox"
               class="terse-switch__input"
               :name="name" ref="input"
               :true-value="activeValue"
               :false-value="inactiveValue"
        />
    </div>
</template>
<script>
  export default {
    name: 'terse-switch',
    props: {
      value: {
        required: true,
        type: [Boolean, Number, String],

      },
      disabled: {
        type: Boolean,
        default: false
      },
      name: {
        type: String,
        default: ''
      },
      width: {
        type: Number,
        default: 40
      },
      activeColor: {
        type: String,
        default: '#409EFF'
      },
      inactiveColor: {
        type: String,
        default: '#C0CCDA'
      },
      activeValue: {
        type: [Number, Boolean, String],
        default: true
      },
      inactiveValue: {
        type: [Number, Boolean, String],
        default: false
      },
      activeText: {
        type: String,
      },
      inactiveText: {
        type: String
      }
    },
    methods: {
      switchValue() {
        !this.disabled && this.handleChange()
      },
      handleChange() {
        const value = this.checked ? this.inactiveValue : this.activeValue
        this.$emit('input', value)
        this.$emit('change', value)
        this.$nextTick(() => {
          this.setColor()
          this.setTextActive()
        })
      },
      setColor() {
        const color = this.checked ? this.activeColor : this.inactiveColor
        this.$refs.core.style.backgroundColor = color
        this.$refs.core.style.borderColor = color
      },
      setTextActive() {
        if (this.checked && this.activeText) {
          this.$refs.left.style.color = this.activeColor
          this.$refs.right.style.color = '#000'
          return
        } else if (!this.checked && this.inactiveText) {
          this.$refs.left.style.color = '#000'
          this.$refs.right.style.color = this.activeColor
        }
      }
    },
    computed: {
      checked() {
        return this.value === this.activeValue
      }
    },
    mounted() {
      this.setColor()
      this.setTextActive()
    }
  }
</script>
<style lang="less" scoped>
    @import "./src/assets/variable.less";

    .terse-switch {
        display: inline-flex;
        align-items: center;
        position: relative;
        font-size: 16px;
        height: 20px;
        line-height: 20px;
        vertical-align: middle;
        cursor: pointer;

        .el-switch__label {
            padding-right: 10px;

            &--right {
                padding-right: 0;
                padding-left: 10px;
            }
        }

        .terse-switch__core {
            width: 40px;
            height: 100%;
            margin: 0;
            box-sizing: border-box;
            border: 1px solid #DCDFE6;
            background: #DCDFE6;
            position: relative;
            border-radius: 10px;
            transition: background .3s, border-color .3s;

            &:after {
                content: "";
                position: absolute;
                left: 1px;
                top: 1px;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: #fff;
                transition: all .3s;
            }
        }

        .terse-switch__input {
            position: absolute;
            margin: 0;
            padding: 0;
            right: 0;
            top: 0;
            width: 0;
            height: 0;
        }

        &.is-checked {
            .terse-switch__core {
                background: @theme-color-primary;
                border-color: @theme-color-primary;

                &:after {
                    left: 100%;
                    margin-left: -17px;
                }
            }
        }

        &.is-disabled {
            cursor: not-allowed;
        }
    }
</style>