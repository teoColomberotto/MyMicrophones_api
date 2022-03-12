<template>
    <div class="container">
        <div v-for="(item, index) in itemsWithHome" :key="item.label" class="items">
            <component
                :is="item.to ? 'nuxt-link' : 'div'"
                :class="[
                    {
                        'font-bold': index + 1 !== itemsWithHome.length,
                        underline: index + 1 === itemsWithHome.length,
                    },
                ]"
                :to="item.to"
                class="item-label"
            >
                {{ item.label }}
            </component>

            <span class="item-separator">
                <font-awesome-icon icon="fa-solid fa-chevron-right" />
            </span>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        itemsWithHome() {
            const routeItems = this.$route.path.split('/').filter((item) => item);
            const nonRouteItems = ['lists'];

            const items = [
                {
                    label: 'Home',
                    link: {
                        name: 'homepage',
                    },
                },
            ];

            // Build breadcrumb items with links
            routeItems.forEach((routeItem, index) => {
                if (index === 0) {
                    items.push({
                        label: routeItem,
                        to: {
                            name: routeItem,
                        },
                    });
                } else {
                    const item = {
                        label: this.$filters.unslugify(routeItem),
                    };

                    if (!nonRouteItems.includes(routeItem)) {
                        item.to = {
                            name: this.$route.name,
                            params: this.$route.params,
                        };
                    }

                    items.push(item);
                }
            });

            return items;
        },
    },
};
</script>

<style scoped>
.container {
    margin: 2rem;
    padding: 1rem;
    padding-left: 2rem;
    border-radius: 25px;
    background-color: var(--main-black);
    color: var(--main-color);
    display: inline-block;
}

.items {
    display: flex;
    gap: 5px;
}

.item-label {
}

.item-separator {
}
</style>
