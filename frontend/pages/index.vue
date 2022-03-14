<template>
    <div>
        <my-list-sort></my-list-sort>
        <!-- <my-items-list></my-items-list> -->
        <!-- <my-item-rectangle></my-item-rectangle> -->
        <!-- <my-image src="https://via.placeholder.com/150"></my-image> -->
        <!-- <my-snackbar type="message">
            <template #message> Ops, something went wrong</template>
        </my-snackbar> -->
        <!-- <my-badge title="badge">
            <template #icon>
                <font-awesome-icon icon="fa-solid fa-user-tie" />
            </template>
        </my-badge> -->
        <!-- <my-button @click.native="$store.dispatch('microphones/getMicrophones', { manufactor: 'Neumann' })"
            >Get Microphones</my-button
        >
        <my-button @click.native="getMics()">See microphones</my-button> -->
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
import MyImageVue from '../components/atoms/MyImage.vue';
import MySnackBarVue from '../components/atoms/MySnackBar.vue';
import MySpinnerVue from '../components/atoms/MySpinner.vue';
import MyItemRectangleVue from '../components/molecules/MyItemRectangle.vue';
import MyListSortVue from '../components/molecules/MyListSort.vue';
import MyItemsListVue from '../components/organisms/MyItemsList.vue';

export default {
    name: 'IndexPage',
    components: {
        'my-list-sort': MyListSortVue,
        // 'my-items-list': MyItemsListVue,
        // 'my-image': MyImageVue,
        // 'my-item-rectangle': MyItemRectangleVue,
        // 'my-snackbar': MySnackBRectangle
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
