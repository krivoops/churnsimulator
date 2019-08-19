<template>
    <div ref="target">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';

const namespace = 'churn-simulator';

@Component
export default class Playground extends Vue {
    @Action('init', { namespace }) init: any;

    public mounted() {
        this.init(this.$refs.target)
    }
}
</script>

<style lang="scss">
    .bubble {
        max-width: 200px;
        max-height: 200px;
        text-align: center;
        opacity: 0;
        cursor: pointer;
        background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%,rgba(255,255,255,0) 50%);
        user-select: none;
        &.entered {
            opacity: 1 !important;
            transition: all .5s;
        }
        &.deleted {
            max-width: 0 !important;
            font-size: 0 !important;
            max-height: 0 !important;
        }
    }
</style>
