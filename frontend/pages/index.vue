<template>
    <div>
        <!-- <my-snackbar type="message">
            <template #message> Ops, something went wrong</template>
        </my-snackbar>
        <my-badge title="badge">
            <template #icon>
                <font-awesome-icon icon="fa-solid fa-user-tie" />
            </template>
        </my-badge>
        <my-button
            @click.native="
                $store.dispatch('notifications/addNotification', { message: 'test notification message', type: 'success' })
            "
            >Push notification</my-button
        > -->
        <!-- <profile-icon></profile-icon> -->
        <!-- <my-text-input
            type="password"
            v-model="email"
            label="Email"
            icon="fa-solid fa-user-tie"
            placeholder="Please input a valid email address"
            :options="options"
        ></my-text-input> -->
        <!-- <my-pagination :pageSize="20" @pageChanged="onPageChange" :total="140" :current-page="currentPage"></my-pagination> -->
    </div>
</template>

<script>
import MyBadgeVue from '../components/atoms/MyBadge.vue';
import MyButtonVue from '../components/atoms/MyButton.vue';
import MySnackBarVue from '../components/atoms/MySnackBar.vue';

export default {
    name: 'IndexPage',
    components: {
        // 'my-snackbar': MySnackBarVue,
        // 'my-badge': MyBadgeVue,
        // 'my-button': MyButtonVue,
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
