<template>
    <div>
        <h1>Страница с постами</h1>
        <MyInput v-focus v-model="searchQuery" placeholder="Поиск..." />
        <div class="app__btns">
            <MyButton>Создать пост</MyButton>
            <MySelect v-model="selectedSort" :options="sortOptions"/>
        </div>
        <MyDialog v-model:show="dialogVisible">
            <PostForm /> 
        </MyDialog>
        <PostList :posts="sortedAndSearchedPosts" v-if="!isPostsLoading"/>
        <div v-else>Идет загрузка...</div>
    </div>
</template>

<script>
import PostList from "@/components/PostList.vue";
import PostForm from "@/components/PostForm.vue";


export default {
    components: {
    PostForm, PostList,
},
    data() {
        return {
            dialogVisible: false,
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По содержанию'},
            ],
        }
    },
    setup(props) {
        const {posts, totalPages, isPostsLoading} = usePosts(10);
        const {sortedPosts, selectedSort} = useSortedPosts(posts);
        const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts);

        return {
            sortedAndSearchedPosts,
            totalPages,
            isPostsLoading,
            selectedSort,
            searchQuery
        }
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