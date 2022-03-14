<template>
    <div class="list-container">
        <my-item-square
            v-for="microphone in microphones"
            :key="microphone._id"
            :item="microphone"
            class="list-item"
        ></my-item-square>
    </div>
</template>

<script>
import MyItemSquareVue from '../molecules/MyItemSquare.vue';

export default {
    components: {
        'my-item-square': MyItemSquareVue,
    },
    data() {
        return {
            microphones: null,
        };
    },
    mounted() {
        console.log('list mounted');
        this.microphones = this.$store.getters['microphones/getMicrophones']({
            direction: 'DESC',
            parameter: 'rating',
        });
    },
};
</script>

<style>
.list-container {
    display: flex;
    flex-direction: row;
    flex: 1 1 0;
    flex-wrap: wrap;
}
</style>
