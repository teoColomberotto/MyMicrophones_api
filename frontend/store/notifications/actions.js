export default {
    addNotification({ commit }, notification) {
        commit('push_notification', notification);
    },
    removeNotification({ commit }, notification) {
        commit('remove_notification', notification);
    },
};
