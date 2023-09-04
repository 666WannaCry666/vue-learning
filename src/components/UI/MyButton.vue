<template>
    <button :class="['btn', buttonClass]">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'MyButton',
        props: {
            buttonClass: {
                type: String,
                required: false
            }
        }
    }
</script>

<style scoped>
.btn {
    padding: 10px;
    background: none;
    border: 1px solid teal;
    color: teal;
    cursor: pointer;
}

.btn:hover {
    background: teal;
    color: #fff;
}
</style>