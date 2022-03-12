<template>
    <div class="notifications-container">
        <my-notification
            v-for="notification in notifications"
            :key="notification.id"
            :notification="notification"
        ></my-notification>
    </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapState } from 'vuex';
import MyNotificationVue from '../atoms/MyNotification.vue';

export default {
    components: {
        'my-notification': MyNotificationVue,
    },
    computed: {
        ...mapState('notifications', ['notifications']),
    },
};
</script>

<style>
.notifications-container {
    position: fixed;
    bottom: 0;
    right: 0;
    margin-right: 15px;
    width: 300px;
}
</style>
