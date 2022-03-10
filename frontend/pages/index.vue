<template>
    <div>
        <my-card>
            <template v-slot:header><h1>Hello world</h1></template>
            <template v-slot:body>
                <my-button mode="">Button</my-button>
            </template>
        </my-card>
        <profile-icon></profile-icon>
    </div>
</template>

<script>
import MyButton from '../components/atoms/MyButton.vue';
import MyCard from '../components/molecules/MyCard.vue';
import MyProfileIconVue from '../components/molecules/MyProfileIcon.vue';

export default {
    name: 'IndexPage',
    components: {
        'my-button': MyButton,
        'my-card': MyCard,
        'profile-icon': MyProfileIconVue,
    },
};
</script>

<style scoped>
h1 {
    font-weight: 900;
}
</style>
