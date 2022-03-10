<template>
    <div>
        <the-header />
        <Nuxt />
    </div>
</template>

<script>
import TheHeader from '../components/templates/TheHeader.vue';

export default {
    components: {
        'the-header': TheHeader,
    },
};
</script>

<style></style>
