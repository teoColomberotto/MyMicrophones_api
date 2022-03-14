<template>
    <div class="items">
        <div class="actions">
            <my-list-sort class="list-sort" @sort-changed="sortItems"></my-list-sort>
            <my-pagination
                class="list-pagination"
                :total="items.length"
                :pageSize="pageSize"
                :current-page="currentPage"
                @pageChanged="pageChanged"
            ></my-pagination>
        </div>

        <div class="list-container">
            <my-item-square
                v-for="microphone in microphones"
                :key="microphone._id"
                :item="microphone"
                class="list-item"
            ></my-item-square>
        </div>
    </div>
</template>

<script>
import MyItemSquareVue from '../molecules/MyItemSquare.vue';
import MyListSortVue from '../molecules/MyListSort.vue';
import MyPaginationVue from '../molecules/MyPagination.vue';

export default {
    components: {
        'my-item-square': MyItemSquareVue,
        'my-list-sort': MyListSortVue,
        'my-pagination': MyPaginationVue,
    },
    data() {
        return {
            items: null,
            microphones: null,
            currentPage: 1,
            pageSize: 5,
        };
    },
    created() {
        this.items = this.$store.getters['microphones/getMicrophones']({
            direction: 'ASC',
            parameter: 'rating',
        });
        this.microphones = this.items;
    },
    mounted() {},
    methods: {
        sortItems(sortSettings) {
            const mics = this.items;
            mics.sort((a, b) => {
                if (sortSettings.direction === 'DESC') {
                    return a[sortSettings.parameter] < b[sortSettings.parameter] ? 1 : -1;
                }
                if (sortSettings.direction === 'ASC') {
                    return a[sortSettings.parameter] > b[sortSettings.parameter] ? 1 : -1;
                }
                return 1;
            });
            this.microphones = mics;
        },
        pageChanged(currentPage) {
            this.currentPage = currentPage;
            const mics = this.items;
            const output = mics.slice((currentPage - 1) * this.pageSize, currentPage * this.pageSize);
            console.log(mics);
            this.microphones = output;
        },
    },
};
</script>

<style>
.items {
    display: block;
}
.actions {
    display: flex;
    align-items: center;
}
.list-container {
    display: flex;
    flex-direction: row;
    flex: 1 1 0;
    flex-wrap: wrap;
}

.list-sort {
    position: relative;
    z-index: 10;
}
.list-pagination {
    position: relative;
    z-index: 5;
}
</style>
