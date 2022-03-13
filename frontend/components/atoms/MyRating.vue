<template>
    <div class="rating">
        <font-awesome-icon :icon="star" v-for="(star, index) in stars" :key="index" size="1x" />
        <div class="rating-number">{{ rating }}</div>
    </div>
</template>

<script>
export default {
    props: {
        rating: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            stars: [],
        };
    },
    computed: {},
    mounted() {
        const [whole, part] = parseFloat(this.rating).toString().split('.');
        for (let i = 0; i < whole; i++) {
            this.stars.push('fa-solid fa-star');
        }
        if (part) this.stars.push('fa-regular fa-star-half-stroke');
        for (let i = whole; i < (part ? 4 : 5); i++) this.stars.push('fa-regular fa-star');
        return this.stars;
    },
};
</script>

<style scoped>
.rating {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.rating-number {
    margin-left: 5px;
}
</style>
