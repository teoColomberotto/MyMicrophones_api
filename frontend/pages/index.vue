<template>
    <div>
        <profile-icon></profile-icon>
        <my-pagination :pageSize="20" @pageChanged="onPageChange" :total="140" :current-page="currentPage"></my-pagination>
    </div>
</template>

<script>
import MyPaginationVue from '../components/molecules/MyPagination.vue';
import MyProfileIconVue from '../components/molecules/MyProfileIcon.vue';

export default {
    name: 'IndexPage',
    components: {
        'profile-icon': MyProfileIconVue,
        'my-pagination': MyPaginationVue,
    },
    data() {
        return {
            currentPage: 1,
        };
    },
    methods: {
        onPageChange(page) {
            console.log(page);
            this.currentPage = page;
        },
    },
};
</script>

<style scoped>
h1 {
    font-weight: 900;
}
</style>
