export default {
    async getMicrophones({ commit }, queryParams) {
        const microphones = await this.$api.microphone.getMicrophones(queryParams);
        console.log('microphones from api', microphones);
        commit('PUSH_MICROPHONES', microphones);
    },
    async getMicrophonesNumber({ commit }) {
        const microphones = await this.$api.microphone.getMicrophones({});
        const micsNr = microphones.length;
        console.log('microphones total number from api', micsNr);
        commit('PUSH_MICROPHONES_NUMBERS', micsNr);
    },

    sortMicrophones({ commit }, sortSettings) {
        commit('SORT_MICROPHONES', sortSettings);
    },

    filterMicrophones({ commit }, filterQuery) {
        commit('UPDATE_FILTER', filterQuery);
    },
};
