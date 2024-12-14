<template>
    <div class="phone-frame">
        <div className="phone-notch"></div>
        <div class="phone-content">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: 'Frame'
};
</script>

<style scoped>
.phone-frame {
    position: absolute;
    z-index: 0;

    width: 92%;
    height: 98%;

    border-radius: 60px;
    box-shadow: 0 0 0.1em 0.25em #050506, 0 0 0 0.4em hsl(254, 30%, 85%);
}

.phone-content {
    height: 100%;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    overflow: hidden;
    border-radius: 60px;
}

.phone-notch {
    position: absolute;
    top: 0.75rem;
    left: 50%;
    transform: translateX(-50%);

    height: 2.25rem;

    width: 30%;
    background-color: black;

    border-radius: 25px;
    cursor: pointer;
}
</style>
