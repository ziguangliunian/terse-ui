<template>
    <div class="terse-tab-pane">
        <div v-show="active">
            <slot></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: "terse-tab-pane",
    props: {
      label: {
        requird: true,
        type: String
      },
      name: {
        equird: true,
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    inject: ['events'],
    data() {
      return {
        active: false
      }
    },
    methods: {
      showVisiable(name) {
        this.active = name === this.name
      },
      remove(name) {
        if (this.name === name) {
          this.$destroy()
          this.$el.parentNode.removeChild(this.$el)
        }
      }
    },
    mounted() {
      this.events.$on('title-click', name => this.showVisiable(name))
      this.events.$on('remove', name => this.remove(name))
    },
    beforeDestroy() {
      this.events.$off('title-click', name => this.showVisiable(name))
      this.events.$off('remove', name => this.remove(name))
    }
  }
</script>

<style scoped>

</style>