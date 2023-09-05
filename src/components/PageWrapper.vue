<template>
    <div class="page__wrapper">
        <Page 
            :currentPage="currentPage"
            v-for="pageNumber in totalPages"
            :page="pageNumber" 
            :key="pageNumber"
            @click="changePage(pageNumber)"
        />
    </div>
</template>

<script>
import Page from './Page.vue';

    export default {
    props: {
        totalPages: {
            type: Number,
            required: true,
            default: 0
        },
        currentPage: {
            type: Number,
            required: true,
            default: 1
        }
    },
    components: { Page },
    methods: {
        changePage(pageNumber) {
            this.$emit('changePage', pageNumber)
        }
    }
}
</script>

<style scoped>
.page__wrapper {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    gap: 5px;
}
</style>