export default {
    getMicrophones(state) {
        // console.log('filterQuery from getter: ', state.filterQuery);
        if (state.filterQuery === '' || state.filterQuery === null) {
            console.log('AllMics');
            return state.microphones;
        }
        const mics = state.microphones.filter((microphone) => {
            if (microphone.name.includes(state.filterQuery)) {
                return true;
            }
            return false;
        });
        // console.log('filteredMics', mics);
        return mics;

        // return state.microphones;
    },
    getMicrophonesNumber(state) {
        return state.microphonesNumber;
    },
};
