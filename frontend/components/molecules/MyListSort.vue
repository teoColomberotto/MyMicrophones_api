<template>
    <div class="sort-container">
        <my-button mode="icon" iconColor="var(--main-black)" @click.native="onChangeDirection()" class="sort-direction">
            <font-awesome-icon :icon="sortIcon" font-size="20px" />
        </my-button>
        <my-select :options="parameters" @input-selected="onChangeParameter" class="sort-parameter-wrap"></my-select>
    </div>
</template>

<script>
import MyButtonVue from '../atoms/MyButton.vue';
import MySelectVue from '../atoms/MySelect.vue';

export default {
    components: {
        'my-button': MyButtonVue,
        'my-select': MySelectVue,
    },
    props: {
        parameters: {
            type: Array,
            required: false,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: () => ['Rating', 'Year', 'Name'],
        },
    },
    data() {
        return {
            direction: true,
            parameter: 'Rating',
        };
    },
    computed: {
        sortIcon() {
            //ASC
            if (this.parameter === 'Rating' && this.direction === true) {
                return 'fa-solid fa-arrow-down-wide-short';
            }
            if (this.parameter === 'Year' && this.direction === true) {
                return 'fa-solid fa-arrow-down-1-9';
            }
            if (this.parameter === 'Name' && this.direction === true) {
                return 'fa-solid fa-arrow-down-a-z';
            }
            //DESC
            if (this.parameter === 'Rating' && this.direction === false) {
                return 'fa-solid fa-arrow-up-short-wide';
            }
            if (this.parameter === 'Year' && this.direction === false) {
                return 'fa-solid fa-arrow-up-9-1';
            }
            if (this.parameter === 'Name' && this.direction === false) {
                return 'fa-solid fa-arrow-up-z-a';
            }
            return 'fa-solid fa-arrow-down-wide-short';
        },
        getDirection() {
            let dir = 'ASC';
            if (this.direction === false) {
                dir = 'DESC';
            }
            return dir;
        },
    },
    mounted() {},
    methods: {
        onChangeDirection() {
            this.direction = !this.direction;

            const payload = {
                direction: this.getDirection,
                parameter: this.parameter,
            };
            this.$emit('sort-changed', payload);
        },
        onChangeParameter(option) {
            console.log('parameter changed', option);
            if (option === this.parameter) {
                return;
            }
            this.parameter = option;
            const payload = {
                direction: this.getDirection,
                parameter: this.parameter,
            };
            this.$emit('sort-changed', payload);
        },
    },
};
</script>

<style>
.sort-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
}
.sort-direction {
    margin-right: 15px;
}
</style>
