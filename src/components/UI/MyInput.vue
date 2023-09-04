<template>
    <input :value="modelValue" @input="updateInput" :class="['input', inputClass]" type="text">
</template>

<script>
    export default {
        name: 'MyInput',
        props: {
            inputClass: {
                type: String,
                required: false
            },
            modelValue: {
                type: [String, Number],
                required: false
            }
        },
        methods: {
            updateInput(event) {
                this.$emit('update:modelValue', event.target.value)
            }
        }
    }
</script>

<style scoped>
.input {
    width: 100%;
    border: 1px solid teal;
    padding: 10px 15px;
    margin-top: 15px;
}
</style>