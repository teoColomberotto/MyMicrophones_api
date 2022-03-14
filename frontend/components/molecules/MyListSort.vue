<template>
    <div class="sort-container">
        <my-button mode="icon" iconColor="var(--main-black)" @click.native="onChangeDirection()">
            <font-awesome-icon :icon="sortIcon" size="2x" />
        </my-button>
        <select v-model="parameter" @change="onChangeParameter()">
            <option v-for="(parameter, index) in parameters" :key="index">{{ parameter }}</option>
        </select>
    </div>
</template>

<script>
import MyButtonVue from '../atoms/MyButton.vue';

export default {
    components: {
        'my-button': MyButtonVue,
    },
    props: {
        parameters: {
            type: Array,
            required: false,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: () => ['rating', 'year', 'name'],
        },
    },
    data() {
        return {
            direction: true,
            parameter: 'rating',
        };
    },
    computed: {
        sortIcon() {
            //ASC
            if (this.parameter === 'rating' && this.direction === true) {
                return 'fa-solid fa-arrow-down-wide-short';
            }
            if (this.parameter === 'year' && this.direction === true) {
                return 'fa-solid fa-arrow-down-1-9';
            }
            if (this.parameter === 'name' && this.direction === true) {
                return 'fa-solid fa-arrow-down-a-z';
            }
            //DESC
            if (this.parameter === 'rating' && this.direction === false) {
                return 'fa-solid fa-arrow-up-short-wide';
            }
            if (this.parameter === 'year' && this.direction === false) {
                return 'fa-solid fa-arrow-up-9-1';
            }
            if (this.parameter === 'name' && this.direction === false) {
                return 'fa-solid fa-arrow-up-z-a';
            }
            return null;
        },
        getDirection() {
            let dir = 'ASC';
            if (this.direction === false) {
                dir = 'DESC';
            }
            return dir;
        },
    },
    methods: {
        onChangeDirection() {
            this.direction = !this.direction;

            const payload = {
                direction: this.getDirection,
                parameter: this.parameter,
            };
            this.$emit('sort-changed', payload);
        },
        onChangeParameter() {
            const payload = {
                direction: this.getDirection,
                parameter: this.parameter,
            };
            this.$emit('sort-changed', payload);
        },
    },
};
</script>

<style></style>
