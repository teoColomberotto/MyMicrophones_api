export default {
    push_notification(state, notification) {
        state.notifications.push({
            ...notification,
            id: (Math.random().toString(36) + Date.now().toString(36)).substring(2),
        });
    },
    remove_notification(state, notificationToRemove) {
        state.notifications = state.notifications.filter((notification) => {
            return notification.id !== notificationToRemove.id;
        });
    },
};
