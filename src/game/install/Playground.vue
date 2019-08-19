<template>
    <div ref="target" class="border-2 w-full overflow-hidden shadow-lg">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';

const namespace = 'churn-simulator';

@Component
export default class Playground extends Vue {
    @Action('init', { namespace }) init;

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
        transition: all .5s;
        cursor: pointer;
        background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%,rgba(255,255,255,0) 50%);
        user-select: none;
        &.deleted {
            max-width: 0 !important;
            font-size: 0 !important;
            max-height: 0 !important;
        }
    }
</style>
