<template>
    <div class="item">
        <div class="item-container">
            <div class="favorite" v-responsive="'hidden-xs'">
                <my-button mode="icon">
                    <font-awesome-icon icon="fa-regular fa-star" size="3x" />
                </my-button>
            </div>
            <div class="item-image-wrap">
                <client-only>
                    <my-image
                        class="image"
                        src="https://static-neumann.s3.amazonaws.com/img/1859/product_detail_x2_desktop_U-47_Neumann-Studio-Microphone_H.png"
                    ></my-image>
                </client-only>
            </div>
            <div class="item-detail">
                <div class="item-badges-wrap" v-responsive="'hidden-xs'">
                    <my-badge :title="item.technology"></my-badge>
                    <my-badge :title="item.preamp"></my-badge>
                </div>

                <div class="item-info">
                    <h1 class="item-info-name">{{ item.name }}</h1>
                    <h3 class="item-info-manufactor">{{ item.manufactor }}</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MyBadgeVue from '../atoms/MyBadge.vue';
import MyButtonVue from '../atoms/MyButton.vue';
import MyImageVue from '../atoms/MyImage.vue';

export default {
    components: {
        'my-badge': MyBadgeVue,
        'my-button': MyButtonVue,
        'my-image': MyImageVue,
    },
    data() {
        return {
            item: {
                name: 'Test mic',
                manufactor: 'Neumann',
                year: '1969',
                technology: 'condenser',
                preamp: 'tube',
            },
        };
    },
};
</script>

<style scoped>
.item {
    flex: 1 1 33.333%;
    width: 100%;
    padding: 25px;
    max-width: 400px;
}

.item-container {
    overflow: hidden;
    position: relative;
    padding: 25px;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
}
.item-image-wrap {
    position: relative;
    z-index: 5;
    width: 100%;
    margin: -25px 0px 0px 0px;
}
.image {
    width: 100%;
}

.item-detail {
    position: relative;
    z-index: 0;
    padding: 0px 15px 15px 15px;
    margin: 0px -25px -25px;
}

.favorite {
    position: absolute;
    z-index: 10;
    top: 0px;
    right: 0px;
    padding: 10px;
}

/* DESKTOP */
@media only screen and (min-width: 600px) {
    .item-info-name {
        font-size: 4rem;
        font-weight: 900;
    }
    .item-info-manufactor {
        position: absolute;
        bottom: 10px;
    }
}
/* MOBILE */
@media only screen and (max-width: 600px) {
    .item-info-name {
        font-size: 8vw;
        font-weight: 900;
    }
}
</style>
