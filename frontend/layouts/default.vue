<template>
    <div>
        <!-- <the-header /> -->
        <Nuxt />
        <my-notifications-list></my-notifications-list>
    </div>
</template>

<script>
import MyNotificationListVue from '../components/molecules/MyNotificationList.vue';
// import TheHeader from '../components/templates/TheHeader.vue';

export default {
    components: {
        // 'the-header': TheHeader,
        'my-notifications-list': MyNotificationListVue,
    },
};
</script>

<style></style>
