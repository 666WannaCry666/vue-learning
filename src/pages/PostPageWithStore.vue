<template>
    <div>
        <h1>Страница с постами</h1>
        <MyInput v-focus :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Поиск..." />
        <div class="app__btns">
            <MyButton @click="showDialog">Создать пост</MyButton>
            <MySelect @update:model-value="setSelectedSort" :model-value="selectedSort" :options="sortOptions"/>
        </div>
        <MyDialog v-model:show="dialogVisible">
            <PostForm @create="createPost"/> 
        </MyDialog>
        <PostList @remove="removePost" :posts="sortedAndSearchedPosts" v-if="!isPostsLoading"/>
        <div v-else>Идет загрузка...</div>
        <div v-intersection="loadMorePosts" class="observer"></div>
    </div>
</template>

<script>
import PostList from "@/components/PostList.vue";
import PostForm from "@/components/PostForm.vue";
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
    components: {
    PostForm, PostList,
},
    data() {
        return {
            dialogVisible: false,
        }
    },
    methods: {
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort',
            setPosts: 'post/setPosts'
        }),
        ...mapActions({
            fetchPosts: 'post/fetchPosts',
            loadMorePosts: 'post/loadMorePosts'
        }),
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
    },
    mounted() {
        this.fetchPosts()
    },
    unmounted() {
        this.setPage(1),
        this.setSelectedSort('')
    },
    computed: {
        ...mapState({
            posts: state => state.post.posts,
            isPostsLoading: state => state.post.isPostsLoading,
            selectedSort: state => state.post.selectedSort,
            sortOptions: state => state.post.sortOptions,
            searchQuery: state => state.post.searchQuery,
            page: state => state.post.page,
            limit: state => state.post.limit,
            totalPages: state => state.post.totalPages,
        }),
        ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
        })
    },
    watch: {

    }
}
</script>

<style>
.app__btns {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    margin-bottom: 15px;
}

.observer {
    height: 30px;
}
</style>