<template>
    <div class="app">
        <PostForm @create="createPost"/>
        <PostList @remove="removePost" :posts="posts"/>
    </div>
</template>

<script>
import PostList from "@/components/PostList.vue";
import PostForm from "@/components/PostForm.vue";

export default {
    components: {
        PostForm, PostList
    },
    data() {
        return {
            posts: [
                { id: 1, title: 'Javascript', body: 'Описание поста' },
                { id: 2, title: 'Python', body: 'Описание поста 1' },
                { id: 3, title: 'C++', body: 'Описание поста 2' },
            ],
        }
    },
    methods: {
        createPost(post) {
            this.posts.push(post)
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id)
        }
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.app {
    padding: 20px;
}
</style>