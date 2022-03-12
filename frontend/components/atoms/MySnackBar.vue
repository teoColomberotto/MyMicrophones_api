<template>
    <div :class="type">
        <slot name="message"></slot>
        <slot name="action" @>close</slot>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    props: {
        type: { type: String, required: true, default: 'message' },
        duration: { type: Number, required: false, default: 3000 },
    },
    mounted() {
        setTimeout(() => {
            this.remove();
        }, this.duration);
    },
    methods: {
        remove() {
            this.$emit('removeAlert');
        },
    },
};
</script>

<style lang="css" scoped>
div {
    margin: 2rem auto;
    padding: 1rem;
    max-width: 40rem;
    border-radius: 12px;
    background-color: var(--main-black);
    color: var(--main-color);
    display: flex;
    align-content: center;
    justify-content: center;
}
</style>
