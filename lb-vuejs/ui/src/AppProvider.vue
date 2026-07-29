<template id="app-provider-template">
    <div class="app-root">
        <div v-if="devMode" class="dev-wrapper">
            <Frame>
                <slot />
            </Frame>
        </div>
        <div v-else class="app-root">
            <slot />
        </div>
    </div>
</template>

<script>
import Frame from './components/Frame.vue';

export default {
    name: 'AppProvider',
    components: { Frame },
    setup() {
        const devMode = !window.invokeNative;

        return { devMode };
    }
};
</script>

<style>
.app-root {
    height: 100%;
    width: 100%;
}
</style>
