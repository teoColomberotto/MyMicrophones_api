<template>
    <div class="test"></div>
</template>

<script>
export default {
    props: {
        Items: {
            type: Array,
            required: true,
        },
    },
    computed: {
        // filteredList() {
        // }
    },
    methods: {
        // sortItems(sortBy, direction) {
        //     this.sort((a, b) => {
        //         if (direction === 'DESC') {
        //             return a.sortBy < b.sortBy ? 1 : -1;
        //         }
        //         if (direction === 'ASC') {
        //             return a.sortBy > b.sortBy ? 1 : -1;
        //         }
        //     }).bind(this);
        // },
    },
};
</script>

<style></style>
