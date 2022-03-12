export default {
    PUSH_NOTIFICATION(state, notification) {
        state.notifications.push({
            ...notification,
            id: (Math.random().toString(36) + Date.now().toString(36)).substring(2),
        });
    },
    REMOVE_NOTIFICATION(state, notificationToRemove) {
        state.notifications = state.notifications.filter((notification) => {
            return notification.id !== notificationToRemove.id;
        });
    },
};
