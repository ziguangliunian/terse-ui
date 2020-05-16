<template>
    <div class="terse-datePicker" v-click-inside>
        <input type="text" :value="selectedDate" class="input" readonly :name="name">
        <div v-show="visiable">
            <div class="wrapper__opera">
                <span @click="changeDate('year',-1)">&lt;</span>
                <span @click="changeDate('month',-1)">&lt;&lt;</span>
                <span>{{timer.year}}年</span>
                <span>{{timer.month}}月</span>
                <span @click="changeDate('month',+1)">&gt;&gt;</span>
                <span @click="changeDate('year',+1)">&gt;</span>
            </div>
            <div class="wrapper__title">
                <span v-for="item of titles " :key="item" class="cell">{{item}}</span>
            </div>
            <div class="wrapper__content">
                <div v-for="i of 6" :key="i">
                    <span class="cell"
                          :class="{notCurrentMonth:!notCurrentMonth(getVisiableDate[(i-1)*7+j-1]),
                          isToday:isToday(getVisiableDate[(i-1)*7+j-1]),
                          isSelect:isSelect(getVisiableDate[(i-1)*7+j-1])}"
                          v-for="j of 7" :key="j+1"
                          @click="chooseDate(getVisiableDate[(i-1)*7+j-1])">
                        {{getDayNumber(getVisiableDate[(i-1)*7+j-1])}}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "terse-date-picker",
    props: {
      value: {
        type: [Date, Number, String],
        default() {
          return new Date()
        }
      },
      name: {
        default: 'date',
        type: String
      }
    },
    data() {
      const timer = this.getValues(this.value)
      const selectValue = timer
      return {
        visiable: false,
        timer,
        selectValue,
        titles: ['日', '一', '二', '三', '四', '五', '六',]
      }
    },
    methods: {
      getValues(value) {
        const date = new Date(value)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        return {year, month, day}
      },
      blur() {
        this.visiable = false
      },
      focus() {
        this.visiable = true
      },
      getDayNumber(value) {
        return value.getDate()
      },
      notCurrentMonth(value) {
        const {year, month} = this.timer
        const y = value.getFullYear()
        const m = value.getMonth() + 1
        return year === y && month === m
      },
      isToday(value) {
        const {year, month, day} = this.getValues(Date.now())
        const y = value.getFullYear()
        const m = value.getMonth() + 1
        const d = value.getDate()
        return year === y && month === m && day === d
      },
      isSelect(value) {
        const {year, month, day} = this.selectValue
        const y = value.getFullYear()
        const m = value.getMonth() + 1
        const d = value.getDate()
        return year === y && month === m && day === d
      },
      chooseDate(value) {
        this.selectValue = this.timer = this.getValues(value)
        this.$emit('input', this.selectedDate)
        this.$emit('change', this.selectedDate)
      },
      changeDate(type, number) {
        let {year, month} = this.timer
        let lastDate = new Date(`${year}/${month}/01`)
        if (type === 'year') {
          lastDate.setFullYear(lastDate.getFullYear() + number)
        } else if (type === 'month') {
          lastDate.setMonth(lastDate.getMonth() + number)
        }
        this.timer = this.getValues(lastDate)
      }
    },
    computed: {
      selectedDate() {
        const {year, month, day} = this.selectValue
        return year + '/' + month + '/' + day
      },
      getVisiableDate() {
        const {year, month} = this.timer
        const currentFirstDay = new Date(year, month - 1, 1)
        const day = currentFirstDay.getDay()
        const beginTime = currentFirstDay.getTime() - day * 24 * 60 * 60 * 1000
        const arr = []
        for (let i = 0; i < 42; i++) {
          arr.push(new Date(beginTime + i * 24 * 60 * 60 * 1000))
        }
        return arr
      }

    },
    directives: {
      clickInside: {
        bind(el, binding, vNode) {
          const handleClick = (e) => {
            if (el.contains(e.target)) {
              vNode.context.focus()
            } else {
              vNode.context.blur()
            }
          }
          el.handleClick = handleClick
          document.addEventListener('click', el.handleClick)
        },
        unbind(el) {
          document.removeEventListener('click', el.handleClick)
        }
      }
    }
  }
</script>

<style scoped lang="less">
    .input {
        margin-left: 10px;
    }

    .wrapper__opera {
        span {
            padding: 0 5px;
            -user-select: none;
            cursor: pointer;
        }
    }

    .wrapper__title, .wrapper__content {
        .cell {
            display: inline-block;
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            box-sizing: border-box;

            &.notCurrentMonth {
                color: gray;
            }

            &.isToday {
                background: red;
                color: #fff;
                font-weight: bold;
            }

            &.isSelect {
                border: 2px solid red;
            }
        }
    }

    .wrapper__content {
        .cell {
            &:hover {
                background: red;
                cursor: pointer;
            }
        }
    }
</style>