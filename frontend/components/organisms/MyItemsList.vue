<template>
    <div class="items">
        <my-list-sort class="list-sort" @sort-changed="sortItems"></my-list-sort>
        <my-pagination
            class="list-pagination"
            :total="totalItemsNr"
            :pageSize="pageSize"
            :current-page="currentPage"
            @pageChanged="pageChanged"
        ></my-pagination>
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
            items: [],
            totalItemsNr: 0,
            currentPage: 1,
            pageSize: 2,
        };
    },
    async created() {
        await this.$store.dispatch('microphones/getMicrophonesNumber');
        await this.$store.dispatch('microphones/getMicrophones', {
            pageSize: this.pageSize,
            page: this.currentPage,
        });
        console.log('state', this.$store.state.microphones.microphones);
        this.totalItemsNr = this.$store.getters['microphones/getMicrophonesNumber'];
        console.log('created list', this.microphones, this.totalItemsNr);
    },
    computed: {
        microphones() {
            return this.$store.getters['microphones/getMicrophones'];
        },
    },
    methods: {
        sortItems(sortSettings) {
            this.$store.dispatch('microphones/sortMicrophones', sortSettings);
        },
        pageChanged(currentPage) {
            this.currentPage = currentPage;
            this.$store.dispatch('microphones/getMicrophones', {
                pageSize: this.pageSize,
                page: this.currentPage,
            });
        },
    },
};
</script>

<style>
.items {
    display: block;
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
