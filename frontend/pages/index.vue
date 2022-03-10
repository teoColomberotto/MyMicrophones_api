<template>
    <div>
        <profile-icon></profile-icon>
    </div>
</template>

<script>
import MyProfileIconVue from '../components/molecules/MyProfileIcon.vue';

export default {
    name: 'IndexPage',
    components: {
        'profile-icon': MyProfileIconVue,
    },
};
</script>

<style scoped>
h1 {
    font-weight: 900;
}
</style>
