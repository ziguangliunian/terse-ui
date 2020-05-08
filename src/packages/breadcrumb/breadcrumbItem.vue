<template>
    <span class="terse-breadcrumb-item" :class="{'is-link':to}">
        <span ref="link">
            <slot></slot>
        </span>
       <span class="breadcrumb-item__separator">{{separator}}</span>
    </span>
</template>

<script>
  import breadcrumb from "./breadcrumb";

  export default {
    name: "terse-breadcrumb-item",
    data() {
      return {
        separator: ''
      }
    },
    props: {
      to: {},
      replace: Boolean
    },
    inject: ['breadcrumb'],
    methods: {
      handleClick() {
        const {$router} = this
        if ((!this.to) || (!$router)) {
          return
        }
        this.replace ? $router.replace(this.to).catch(error => error) : $router.push(this.to).catch(error => error)
      }
    },
    mounted() {
      this.separator = this.breadcrumb.separator
      this.$refs.link && this.$refs.link.addEventListener('click', this.handleClick)
      this.$on('hook:beforeDestory', () => {
        this.$refs.link && this.$refs.link.removeEventListener('click', this.handleClick)
      })
    }
  }
</script>

<style scoped lang="less">
    @import "../assets/variable";

    .terse-breadcrumb-item {
        color: #666666;

        .breadcrumb-item__separator {
            padding: 0 10px;
        }

        &.is-link {
            & > span:first-child {
                color: #000;
                font-weight: bold;
            }

            &:hover > span:first-child {
                cursor: pointer;
                color: @theme-color-primary
            }
        }
    }
</style>