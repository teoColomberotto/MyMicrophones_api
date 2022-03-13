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
            microphones: [
                {
                    name: 'Neumann U47',
                    manufactor: 'Georg Neumann GmbH',
                    year: '1951',
                    technology: 'condenser',
                    preamp: 'tube',
                    rating: 4.0,
                    _id: '44465zrf85jvHz76FTgf1',
                },
                {
                    name: 'Neumann U87',
                    manufactor: 'Georg Neumann GmbH',
                    year: '1951',
                    technology: 'condenser',
                    preamp: 'tube',
                    rating: 4.0,
                    _id: '44465zrf85jvHz76FTgf2',
                },
                {
                    name: 'Neumann U67',
                    manufactor: 'Georg Neumann GmbH',
                    year: '1951',
                    technology: 'condenser',
                    preamp: 'tube',
                    rating: 4.0,
                    _id: '44465zrf85jvHz76FTgf3',
                },
                {
                    name: 'Neumann U47',
                    manufactor: 'Georg Neumann GmbH',
                    year: '1951',
                    technology: 'condenser',
                    preamp: 'tube',
                    rating: 4.0,
                    _id: '44465zrf85jvHz76FTgf4',
                },
                {
                    name: 'Neumann U87',
                    manufactor: 'Georg Neumann GmbH',
                    year: '1951',
                    technology: 'condenser',
                    preamp: 'tube',
                    rating: 4.0,
                    _id: '44465zrf85jvHz76FTgf5',
                },
                {
                    name: 'Neumann U67',
                    manufactor: 'Georg Neumann GmbH',
                    year: '1951',
                    technology: 'condenser',
                    preamp: 'tube',
                    rating: 4.0,
                    _id: '44465zrf85jvHz76FTgf6',
                },
                {
                    name: 'Neumann U47',
                    manufactor: 'Georg Neumann GmbH',
                    year: '1951',
                    technology: 'condenser',
                    preamp: 'tube',
                    rating: 4.0,
                    _id: '44465zrf85jvHz76FTgf7',
                },
                {
                    name: 'Neumann U87',
                    manufactor: 'Georg Neumann GmbH',
                    year: '1951',
                    technology: 'condenser',
                    preamp: 'tube',
                    rating: 4.0,
                    _id: '44465zrf85jvHz76FTgf8',
                },
                {
                    name: 'Neumann U67',
                    manufactor: 'Georg Neumann GmbH',
                    year: '1951',
                    technology: 'condenser',
                    preamp: 'tube',
                    rating: 4.0,
                    _id: '44465zrf85jvHz76FTgf9',
                },
            ],
        };
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
