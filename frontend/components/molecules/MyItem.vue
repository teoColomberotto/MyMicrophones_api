<template>
    <my-card>
        <template #header>
            <div class="badges">
                <my-badge :title="item.technology"></my-badge>
                <my-badge :title="item.preamp"></my-badge>
            </div>
            <div class="favorite">
                <my-button mode="icon">
                    <font-awesome-icon icon="fa-regular fa-star" size="3x" />
                </my-button>
            </div>
        </template>
        <template #body>
            <my-image class="image" src="https://via.placeholder.com/150"></my-image>
            <div class="info">
                <h1 class="info-name">{{ item.name }}</h1>
                <h3 class="info-manufactor">{{ item.manufactor }}</h3>
            </div>
            <div class="actions">
                <my-button>View info</my-button>
            </div>
        </template>
    </my-card>
</template>

<script>
import MyBadgeVue from '../atoms/MyBadge.vue';
import MyButtonVue from '../atoms/MyButton.vue';
import MyCardVue from '../atoms/MyCard.vue';
import MyImageVue from '../atoms/MyImage.vue';

export default {
    components: {
        'my-card': MyCardVue,
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
.info-name {
    font-size: xx-large;
    font-weight: 900;
}
</style>
