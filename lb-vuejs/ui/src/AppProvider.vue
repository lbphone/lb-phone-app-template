<template id="app-provider-template">
    <div>
        <div v-if="devMode" class="dev-wrapper">
            <Frame>
                <slot />
            </Frame>
        </div>
        <div v-else>
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
