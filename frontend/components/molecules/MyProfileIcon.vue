<template>
    <div class="container">
        <a href="#" @click.prevent="showDropDown = !showDropDown">
            <font-awesome-icon icon="fa-solid fa-user-tie" style="font-size: 25px" />
            <font-awesome-icon :icon="iconDispay" style="font-size: 22px" />
        </a>
        <div class="dropdown" v-if="showDropDown">
            <div class="user">
                <p>Signed As:</p>
                <div class="user-name">username</div>
            </div>
            <ul class="menu-list">
                <li class="menu-item" v-for="(link, index) in links" :key="index">
                    <NuxtLink to="/">{{ link.name }}</NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showDropDown: false,
            links: [
                {
                    name: 'MyProfile',
                },
                {
                    name: 'Logout',
                },
            ],
        };
    },
    computed: {
        iconDispay() {
            return this.showDropDown ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down';
        },
    },
};
</script>

<style scoped></style>
