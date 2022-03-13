export default {
    async getMicrophones({ commit }, queryParams) {
        const microphones = await this.$api.microphone.getMicrophones(queryParams);
        commit('GET_MICROPHONES', microphones);
    },
};
