<template>
    <form @submit.prevent>
        <h4>Создание поста</h4>
        <MyInput
            v-focus
            v-model="post.title"
            required
            class="input"
            type="text"
            placeholder="Название поста (обязательно)"
        />
        <MyInput 
            v-model="post.body"
            required
            class="input"
            type="text"
            placeholder="Описание поста (обязательно)"
        />
        <MyButton
            buttonClass="create-post__btn"
            @click="validateAndCreatePost"
        >
            Создать
        </MyButton>
    </form>
</template>

<script>
    export default {
    data() {
        return {
            post: {
                title: '',
                body: '',
            }
        };
    },
    methods: {
        validateAndCreatePost() {
            if (this.post.title.trim() === '' || this.post.body.trim() === '') {
                alert('Пожалуйста, заполните все обязательные поля.');
            } else {
                this.createPost();
            }
        },
        createPost() {
            this.post.id = Date.now();
            this.$emit('create', this.post);
            this.post = {
                title: '',
                body: ''
            };
        }
    }
}
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}

.create-post__btn {
    align-self: flex-end;
    margin-top: 15px;
}
</style>