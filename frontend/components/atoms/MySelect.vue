<template>
    <div class="select-container" :tabindex="tabindex" @blur="open = false">
        <div class="selected-wrap" :class="{ open: open }" @click="open = !open">
            {{ selected }}
            <font-awesome-icon :icon="iconDispay" style="font-size: 22px" class="select-icon" />
        </div>
        <div class="select-items" :class="{ selectHide: !open }">
            <div
                v-for="(option, i) of options"
                :key="i"
                @click="
                    selected = option;
                    open = false;
                    $emit('input-selected', option);
                "
            >
                {{ option }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        options: {
            type: Array,
            required: true,
        },
        default: {
            type: String,
            required: false,
            default: null,
        },
        tabindex: {
            type: Number,
            required: false,
            default: 0,
        },
    },
    data() {
        return {
            // eslint-disable-next-line no-nested-ternary
            selected: this.default ? this.default : this.options.length > 0 ? this.options[0] : null,
            open: false,
        };
    },
    mounted() {
        this.$emit('input-selected', this.selected);
    },
    computed: {
        iconDispay() {
            return this.open ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down';
        },
    },
};
</script>

<style scoped>
.select-container {
    position: relative;
    min-width: 100px;
    max-width: 300px;
    text-align: left;
    outline: none;
    height: 47px;
    line-height: 47px;
}

.selected-wrap {
    font-size: 15px;
    font-weight: 600;
    display: flex;
    align-items: center;
    min-width: 200px;
    max-width: 300px;
    user-select: none;
    cursor: pointer;
}

.select-icon {
    margin-left: 10px;
}

.select-container .selected {
    background-color: var(--main-black);
    border-radius: 6px;
    color: var(--main-white);
    padding-left: 1em;
    cursor: pointer;
    user-select: none;
}

.select-container .selected.open {
    border: 1px solid var(--main-color);
    border-radius: 6px 6px 0px 0px;
}

.select-container .selected-wrap:after {
    position: absolute;
    content: '';
    top: 22px;
    right: 1em;
    width: 0;
    height: 0;
}

.select-container .select-items {
    color: var(--main-black);
    border-radius: 0px 0px 6px 6px;
    overflow: hidden;
    position: absolute;
    background-color: var(--main-light-grey);
    left: 0;
    right: 0;
    z-index: 1;
}

.select-container .select-items div {
    color: var(--main-black);
    padding-left: 1em;
    cursor: pointer;
    user-select: none;
}

.select-container .select-items div:hover {
    background-color: var(--main-color);
}

.selectHide {
    display: none;
}
</style>
