<template>
    <button :class="mode">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        mode: {
            type: String,
            required: false,
            default: null,
        },
    },
};
</script>

<style lang="css" scoped>
button {
    padding: 0.25rem 1.75rem;
    font-family: inherit;
    font-weight: 400;
    background-color: var(--main-color);
    border: none;
    border-radius: 20px;
    color: var(--main-white);
    cursor: pointer;
}

button:hover,
button:active {
    background-color: var(--main-color-dark);
    border-color: var(--main-color);
}

.flat {
    background-color: transparent;
    color: var(--main-color);
    border: none;
    text-decoration: underline;
}

.flat:hover,
.flat:active {
    color: var(--main-color-dark);
    background-color: transparent;
}
.flat:disabled {
    color: var(--main-light-grey);
}

.outline {
    background-color: transparent;
    color: var(--main-color);
    border: 2px solid;
    border-color: var(--main-color);
}
.outline:hover,
.outline:active {
    background-color: var(--main-color);
    color: var(--main-white);
}

.icon {
    background-color: transparent;
    color: var(--main-color);
    border: none;
    padding: 0rem 0rem;
}
.icon:hover,
.icon:active {
    color: var(--main-color-dark);
    background-color: transparent;
}
</style>
