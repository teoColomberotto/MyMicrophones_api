<template>
    <div class="item">
        <div class="item-container" @mouseenter="imageZoom = true" @mouseleave="imageZoom = false">
            <div class="favorite" v-responsive="['hidden-all', 'md', 'lg', 'xl']">
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
                        <h1 class="item-info-name">{{ item.name }}</h1>
                        <h3 class="item-info-manufactor">{{ item.manufactor }}</h3>
                        <my-rating :rating="item.rating"></my-rating>
                    </div>
                    <ul class="item-specs-list" v-responsive="'hidden-xs'">
                        <li class="item-specs-feature">Frequency range: {{ frequencyRange }}</li>
                        <li class="item-specs-feature">Sensitivity: {{ sensitivity }}</li>
                        <li class="item-specs-feature">Polar patterns: {{ polarPatterns }}</li>
                    </ul>
                </div>
                <div class="item-badges-wrap" v-responsive="['hidden-all', 'md', 'lg', 'xl']">
                    <my-badge :title="item.technology" bgColor="var(--main-color)" textColor="var(--main-white)"></my-badge>
                    <my-badge :title="item.preamp" bgColor="var(--main-color)" textColor="var(--main-white)"></my-badge>
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
    data() {
        return {
            item: {
                name: 'Neumann U47',
                manufactor: 'Georg Neumann GmbH',
                year: '1951',
                technology: 'condenser',
                preamp: 'tube',
                rating: 4.0,
                id: '44465zrf85jvHz76FTgf8',
                specs: {
                    frequencyRange: {
                        min: 20,
                        max: 20000,
                    },
                    sensitivity: 1.12,
                    polarPatterns: {
                        omnidirectional: true,
                        cardioid: true,
                        supercardioid: false,
                        hypercardioid: false,
                        figure8: true,
                        shotgun: false,
                    },
                },
            },
            imageZoom: false,
        };
    },
    computed: {
        frequencyRange() {
            return `${this.item.specs.frequencyRange.min} - ${this.item.specs.frequencyRange.max} Hz`;
        },
        sensitivity() {
            const dbV = this.computeSensitivityRatio(this.item.specs.sensitivity);
            return `${dbV}.0 dB (${this.item.specs.sensitivity} mV)`;
        },
        polarPatterns() {
            const patterns = Object.entries(this.item.specs.polarPatterns);
            const filtered = patterns.filter(([key, value]) => value === true);
            console.log(patterns, filtered);
            let output = '';
            filtered.forEach((pattern) => {
                output += pattern[0];
                output += ', ';
            });
            return output;
        },
    },
    methods: {
        viewItem(itemId) {
            this.$emit('viewItem', itemId);
        },
        addToFavorite(itemId) {
            this.$emit('addFavorite', itemId);
        },
        computeSensitivityRatio(value) {
            return parseInt(20 * Math.log10(value / 1000 / 1), 10);
        },
    },
};
</script>

<style scoped>
.item {
    flex: 1 1 33.333%;
    width: 100%;
    padding: 25px;
    max-height: 100px;
}

.item-container {
    overflow: hidden;
    position: relative;
    display: block;
    background-color: var(--main-light-grey);
}
.item-action {
    display: flex;
    flex-direction: row;
}
.item-image-wrap {
    position: relative;
    z-index: 5;
    width: 100%;
    max-height: 180px;
    max-width: 180px;

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
    bottom: 0px;
    right: 0px;
    margin: 15px;
}
.item-badges-wrap {
    position: absolute;
    z-index: 10;
    top: 0px;
    right: 0px;
    margin: 15px;
}
.item-info-name {
    font-size: 20px;
}
</style>
