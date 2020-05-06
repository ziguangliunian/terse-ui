<template>
    <div class="li-button-group">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "terse-button-group"
  }
</script>

<style scoped lang="less">
    .li-button-group {
        display: inline-flex;
        vertical-align: middle;

        .li-btn {
            border-radius: 0;

            &:not(:first-child) {
                margin-left: -1px;
            }

            &:hover {
                z-index: 1;
            }

            &:first-child {
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
            }

            &:last-child {
                border-bottom-right-radius: 4px;
                border-top-right-radius: 4px;
            }
        }

    }
</style>