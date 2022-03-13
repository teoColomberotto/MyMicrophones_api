export default (axios) => ({
    getMicrophones(queryParams) {
        return axios
            .get('/microphones', null, {
                params: {
                    ...queryParams,
                },
            })
            .then((response) => {
                return response.data;
            })
            .catch((err) => console.warn(err));
    },
});
