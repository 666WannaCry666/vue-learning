<template>
    <div class="app">
        <h1>Страница с постами</h1>
        <MyInput v-model="searchQuery" placeholder="Поиск..." />
        <div class="app__btns">
            <MyButton @click="showDialog">Создать пост</MyButton>
            <MySelect v-model="selectedSort" :options="sortOptions"/>
        </div>
        <MyDialog v-model:show="dialogVisible">
            <PostForm @create="createPost"/> 
        </MyDialog>
        <PostList @remove="removePost" :posts="sortedAndSearchedPosts" v-if="!isPostsLoading"/>
        <div v-else>Идет загрузка...</div>
        <PageWrapper @changePage="changePage" :totalPages="totalPages" :currentPage="page" v-if="!isPostsLoading" />
    </div>
</template>

<script>
import PostList from "@/components/PostList.vue";
import PostForm from "@/components/PostForm.vue";
import axios from 'axios';
import PageWrapper from "./components/PageWrapper.vue";

export default {
    components: {
    PostForm, PostList,
    PageWrapper
},
    data() {
        return {
            posts: [],
            dialogVisible: false,
            isPostsLoading: false,
            selectedSort: '',
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По содержанию'},
            ],
            searchQuery: '',
            page: 1,
            limit: 10,
            totalPages: 0,
        }
    },
    methods: {
        createPost(post) {
            this.posts.push(post)
            this.dialogVisible = false;
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showDialog() {
            this.dialogVisible = true;
        },
        async fetchPosts() {
            this.isPostsLoading = true;
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10', {
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    }
                });
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                this.posts = response.data;
            } catch (e) {
                alert('Ошибка')
            } finally {
                this.isPostsLoading = false;
            }
        },
        changePage(pageNumber) {
            this.page = pageNumber;
        }
    },
    mounted() {
        this.fetchPosts();
    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
        },
        sortedAndSearchedPosts() {
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
    },
    watch: {
        page() {
            this.fetchPosts()
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

.app__btns {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    margin-bottom: 15px;
}
</style>