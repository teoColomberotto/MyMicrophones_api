<template>
    <div class="container">
        <NuxtLink to="/">
            <img scr="../../static/project-test-logo.png" width="40" height="40" />
        </NuxtLink>
        <h1 class="title">My Microphones</h1>
    </div>
</template>

<script>
import MyProfileIconVue from '../molecules/MyProfileIcon.vue';

export default {
    name: 'the-header',
    components: {},
};
</script>

<style scoped>
.container {
    padding: 10px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}
</style>
