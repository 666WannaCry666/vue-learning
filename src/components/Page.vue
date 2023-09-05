<template>
    <div 
        class="page"
        :class="{'page-current': page === currentPage}"
    >
        {{ page }}
    </div>
</template>

<script>
    export default {
        props: {
            page: {
                type: Number,
                required: true
            },
            currentPage: {
                type: Number,
                required: true
            }
        }
    }
</script>

<style scoped>
.page {
    border: 1px solid teal;
    padding: 10px;
    color: teal;
    cursor: pointer;
}

.page:hover {
    color: #fff;
    background: teal;
}

.page-current {
    border: 2px solid teal;
    background: teal;
    color: #fff;
}
</style>