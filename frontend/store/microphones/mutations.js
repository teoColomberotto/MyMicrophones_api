export default {
    PUSH_MICROPHONES(state, microphones) {
        state.microphones = microphones;
    },
    PUSH_MICROPHONES_NUMBERS(state, micsNr) {
        state.microphonesNumber = micsNr;
    },
    SORT_MICROPHONES(state, sortSettings) {
        state.microphones.sort((a, b) => {
            if (sortSettings.direction === 'DESC') {
                return a[sortSettings.parameter] < b[sortSettings.parameter] ? 1 : -1;
            }
            if (sortSettings.direction === 'ASC') {
                return a[sortSettings.parameter] > b[sortSettings.parameter] ? 1 : -1;
            }
            return 1;
        });
    },
};
