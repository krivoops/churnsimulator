<template>
    <div class="relative">
        <div class="text-center uppercase mb-3 sticky">Dashboard</div>
        {{  }}
        <div class="height-messages overflow-scroll text-center">
            <transition-group name="fade-deep" tag="div">
                <div :key="score.key" v-for="(score, index) in scores">
                    <div v-if="index <= 7" class="border-t border-b py-2">
                        <div class="font-bold">
                            {{ score.name }}
                        </div>
                        <div>
                            {{ score.score }}
                        </div>
                    </div>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { Getter } from 'vuex-class';

    const dashboardNamespace = 'dashboard';

    @Component
    export default class GameDashboard extends Vue {
        @Getter('scores', { namespace: dashboardNamespace }) scores: any;
    }
</script>

<style>
    .fade-deep-enter-active, .fade-deep-leave-active {
        transition: opacity .8s;

    }
    .fade-deep-enter, .fade-deep-leave-to /* .fade-leave-active до версии 2.1.8 */ {
        transition: opacity .8s;
        opacity: 0;
    }
</style>
