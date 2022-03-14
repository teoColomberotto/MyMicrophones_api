export default {
    getMicrophones(state, getters) {
        return (sortSettings) => {
            // console.log('getter', state.microphones);
            const mics = [...state.microphones];
            mics.sort((a, b) => {
                if (sortSettings.direction === 'DESC') {
                    return a[sortSettings.parameter] < b[sortSettings.parameter] ? 1 : -1;
                }
                if (sortSettings.direction === 'ASC') {
                    return a[sortSettings.parameter] > b[sortSettings.parameter] ? 1 : -1;
                }

                return 1;
            });
            return mics;
        };
    },
};
