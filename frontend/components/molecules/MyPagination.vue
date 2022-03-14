/* eslint-disable max-len */
<template>
    <ul class="pagination">
        <li class="pagination-item">
            <my-button type="button" :mode="'flat'" @click.native="onClickFirstPage" :disabled="isInFirstPage"> First </my-button>
        </li>
        <li class="pagination-item">
            <my-button type="button" :mode="'flat'" @click.native="onClickPreviousPage" :disabled="isInFirstPage">
                &lt;
            </my-button>
        </li>
        <li v-for="(page, index) in pages" :key="index" class="pagination-item">
            <my-button
                type="button"
                :mode="'flat'"
                @click.native="onClickPage(page.name)"
                :disabled="page.isDisabled"
                :class="{ active: isPageActive(page.name) }"
            >
                {{ page.name }}
            </my-button>
        </li>
        <li class="pagination-item">
            <my-button type="button" :mode="'flat'" @click.native="onClickNextPage" :disabled="isInLastPage"> &gt; </my-button>
        </li>
        <li class="pagination-item">
            <my-button type="button" :mode="'flat'" @click.native="onClickLastPage" :disabled="isInLastPage"> Last </my-button>
        </li>
    </ul>
</template>

<script>
import MyButton from '../atoms/MyButton.vue';

export default {
    components: {
        'my-button': MyButton,
    },
    props: {
        maxVisibleButtons: {
            type: Number,
            default: 3,
            required: false,
        },
        pageSize: {
            type: Number,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
        currentPage: {
            type: Number,
            required: true,
        },
    },
    computed: {
        totalPages() {
            return Math.ceil(this.total / this.pageSize) || 1;
            // return (this.total - 1) / this.pageSize + 1;
        },
        startPage() {
            if (this.currentPage === 1) {
                return 1;
            }

            if (this.currentPage === this.totalPages && this.totalPages === this.maxVisibleButtons) {
                // return this.totalPages - this.maxVisibleButtons + 1;
            }

            if (this.currentPage <= Math.floor(this.maxVisibleButtons / 2) + 1) {
                return 1;
                // console.log('floor', Math.floor(this.maxVisibleButtons / 2), this.currentPage);
            }

            return this.currentPage - Math.floor(this.maxVisibleButtons / 2);
        },
        endPage() {
            return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
        },
        pages() {
            const range = [];

            for (let i = this.startPage; i <= this.endPage; i += 1) {
                range.push({
                    name: i,
                    isDisabled: i === this.currentPage,
                });
            }

            return range;
        },
        isInFirstPage() {
            return this.currentPage === 1;
        },
        isInLastPage() {
            return this.currentPage === this.totalPages;
        },
    },
    methods: {
        onClickFirstPage() {
            this.$emit('pageChanged', 1);
        },
        onClickPreviousPage() {
            this.$emit('pageChanged', parseInt(this.currentPage, 10) - 1);
        },
        onClickPage(page) {
            this.$emit('pageChanged', page);
        },
        onClickNextPage() {
            this.$emit('pageChanged', parseInt(this.currentPage, 10) + 1);
        },
        onClickLastPage() {
            this.$emit('pageChanged', parseInt(this.totalPages, 10));
        },
        isPageActive(page) {
            return this.currentPage === page;
        },
    },
};
</script>

<style lang="css" scoped>
.pagination {
    list-style-type: none;
}

.pagination-item {
    display: inline-block;
}

.active {
    background-color: var(--main-color);
    color: var(--main-white);
}

.active:hover {
    background-color: var(--main-color);
    color: var(--main-white);
}

ul {
    padding-left: 0px;
}
</style>
