<template>
    <div class="input-container">
        <div class="input-form">
            <input
                :type="type"
                :value="value"
                :placeholder="placeholderString"
                @input="$emit('input', $event.target.value)"
                :class="'effect ' + hasIcon"
                @focus="showPlaceholder = !showPlaceholder"
                @blur="showPlaceholder = !showPlaceholder"
            />
            <!-- <select :value="value" @input="$emit('input', $event.target.value)" v-if="type === 'select'">
                <option v-for="(option, index) in options" :key="index">{{ option }}</option>
            </select> -->
            <font-awesome-icon :icon="icon" class="input-icon" v-if="icon" />
            <label :style="{ color: color ? color : 'var(--main-color)' }">{{ label }}</label>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        showPlaceholder: true,
    }),
    computed: {
        filled() {
            if (!this.show && this.value) {
                return 'has-content';
            }
            return '';
        },
        hasIcon() {
            if (this.icon) {
                return 'input-has-icon';
            }
            return '';
        },
        placeholderString() {
            if (this.showPlaceholder === true) {
                return this.placeholder;
            }
            return '';
        },
    },
    props: {
        type: { type: String, required: true, default: 'text' },
        value: { type: String, required: false, default: '' },
        label: { type: String, required: false, default: '' },
        icon: { type: String, required: false, default: '' },
        placeholder: { type: String, required: false, default: '' },
        color: { type: String, required: false, default: 'indigo' },
    },
};
</script>

<style scoped>
::placeholder {
    opacity: 0.4;
}

input[type='text'] {
    color: var(--main-color);
    width: 100%;
    box-sizing: border-box;
    letter-spacing: 1px;
    outline: none;
}

.input-container {
    width: 100%;
    padding: 0.5rem 0.5rem 0 0;
}

.input-form {
    float: left;
    width: 100%;
    margin: 1.5rem 0rem 1.5rem 0;
    position: relative;
} /* necessary to give position: relative to parent. */

.input-icon {
    position: relative;
    left: 0rem;
    top: -3.5rem;
    opacity: 0.3;
}
.input-hint {
    float: left;
    width: 100%;
    margin: -1.2rem 0 0 0;
    position: relative;
    font-size: 0.8rem;
    opacity: 0.6;
}

.input-has-icon {
    padding-left: 2rem !important;
}
</style>
