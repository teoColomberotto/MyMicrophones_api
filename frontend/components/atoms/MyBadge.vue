<template>
    <div class="badge-container">
        <slot name="icon"></slot>
        <span class="badge-text" :class="type" v-if="title"> {{ text }}</span>
    </div>
</template>

<script>
export default {
    props: {
        type: { type: String, required: false, default: '' },
        title: { type: String, required: false },
    },
    computed: {
        text() {
            return this.title.toUpperCase();
        },
    },
};
</script>

<style>
.badge-container {
    background-color: var(--main-black);
    color: var(--main-color);
    border-radius: 30px;
    padding: 0.5rem 1.5rem;
    display: inline-block;
}
</style>
