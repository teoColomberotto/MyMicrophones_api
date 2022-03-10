<template>
    <div>
        <my-card>
            <template v-slot:header><h1>Hello world</h1></template>
            <template v-slot:body> <my-button mode="">Button</my-button></template>
        </my-card>
    </div>
</template>

<script>
import MyButton from '../components/atoms/MyButton.vue';
import MyCard from '../components/molecules/MyCard.vue';

export default {
    name: 'IndexPage',
    components: {
        'my-button': MyButton,
        'my-card': MyCard,
    },
};
</script>

<style scoped>
h1 {
    font-weight: 900;
}
</style>
