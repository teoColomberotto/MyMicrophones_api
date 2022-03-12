<template>
    <div>
        <profile-icon></profile-icon>
        <my-text-input
            type="password"
            v-model="email"
            label="Email"
            icon="fa-solid fa-user-tie"
            placeholder="Please input a valid email address"
            :options="options"
        ></my-text-input>
        <!-- <my-pagination :pageSize="20" @pageChanged="onPageChange" :total="140" :current-page="currentPage"></my-pagination> -->
    </div>
</template>

<script>
import MyTextInputVue from '../components/atoms/MyTextInput.vue';
import MyPaginationVue from '../components/molecules/MyPagination.vue';
import MyProfileIconVue from '../components/molecules/MyProfileIcon.vue';

export default {
    name: 'IndexPage',
    components: {
        'profile-icon': MyProfileIconVue,
        'my-text-input': MyTextInputVue,
        // 'my-pagination': MyPaginationVue,
    },
    data() {
        return {
            currentPage: 1,
            email: '',
            options: ['test@mail.com', 'test2@mail.com'],
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
