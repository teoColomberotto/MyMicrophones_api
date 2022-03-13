<template>
    <div class="item">
        <div class="item-container" @mouseenter="imageZoom = true" @mouseleave="imageZoom = false">
            <div class="favorite" v-responsive="'hidden-xs'">
                <my-button mode="icon" iconColor="var(--main-black)" @click.native="addToFavorite(item.id)">
                    <font-awesome-icon icon="fa-regular fa-star" size="2x" />
                </my-button>
            </div>
            <div class="item-action" @click="viewItem(item.id)">
                <div class="item-image-wrap">
                    <client-only>
                        <div :class="imageZoom ? 'item-hover' : ''">
                            <my-image
                                class="image"
                                src="https://static-neumann.s3.amazonaws.com/img/1859/product_detail_x2_desktop_U-47_Neumann-Studio-Microphone_H.png"
                            ></my-image>
                        </div>
                    </client-only>
                </div>
                <div class="item-detail">
                    <div class="item-info">
                        <my-rating :rating="item.rating"></my-rating>
                        <h1 class="item-info-name">{{ item.name }}</h1>
                        <h3 class="item-info-manufactor" v-responsive="'hidden-xs'">{{ item.manufactor }}</h3>
                    </div>
                    <div class="item-badges-wrap" v-responsive="'hidden-xs'">
                        <my-badge :title="item.technology"></my-badge>
                        <my-badge :title="item.preamp"></my-badge>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MyBadgeVue from '../atoms/MyBadge.vue';
import MyButtonVue from '../atoms/MyButton.vue';
import MyImageVue from '../atoms/MyImage.vue';
import MyRatingVue from '../atoms/MyRating.vue';

export default {
    components: {
        'my-badge': MyBadgeVue,
        'my-button': MyButtonVue,
        'my-image': MyImageVue,
        'my-rating': MyRatingVue,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            imageZoom: false,
        };
    },
    methods: {
        viewItem(itemId) {
            this.$emit('viewItem', itemId);
        },
        addToFavorite(itemId) {
            this.$emit('addFavorite', itemId);
        },
    },
};
</script>

<style scoped>
.item {
    flex: 1 1 33.333%;
    width: 100%;
    padding: 25px;
    max-width: 300px;
}

.item-container {
    overflow: hidden;
    position: relative;
}
.item-image-wrap {
    position: relative;
    z-index: 5;
    width: 100%;
    max-height: 300px;
    background-color: var(--main-light-grey);
    padding: 5px;
}
.image {
    width: 100%;
}

.item-hover {
    transform: scale(1.05);
    transition: transform 0.1s;
}

.item-detail {
    position: relative;
    z-index: 0;
    margin-top: 10px;
}

.item-info {
    margin-bottom: 5px;
}

.favorite {
    position: absolute;
    z-index: 10;
    top: 0px;
    right: 0px;
    margin: 10px;
}

/* DESKTOP */
@media only screen and (min-width: 600px) {
    .item-info-name {
        font-size: 20px;
    }
}
/* MOBILE */
@media only screen and (max-width: 544px) {
    .item {
        flex: 1 1 33.333%;
        width: 100%;
        padding: 10px;
        max-width: 300px;
    }
}
</style>
