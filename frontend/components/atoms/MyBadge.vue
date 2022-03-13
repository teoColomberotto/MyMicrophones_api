<template>
    <div class="badge-container" :style="{ backgroundColor: bgColor, color: textColor }">
        <slot name="icon"></slot>
        <span class="badge-text" :class="type" v-if="title"> {{ text }}</span>
    </div>
</template>

<script>
export default {
    props: {
        type: { type: String, required: false, default: '' },
        title: { type: String, required: false },
        bgColor: { type: String, required: false, default: 'var(--main-light-grey)' },
        textColor: { type: String, required: false, default: 'var(--main-black)' },
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
    border-radius: 30px;
    padding: 0.3rem 1rem;
    display: inline-block;
}

.badge-text {
    font-size: 12px;
}
</style>
