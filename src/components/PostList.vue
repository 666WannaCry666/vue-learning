<template>
    <div v-if="posts.length > 0">
        <h3>Список постов</h3>
        <TransitionGroup name="post-list">
            <PostItem 
                v-for="post in posts"
                :post="post"
                :key="post.id"
                @remove="$emit('remove', post)"
            />
        </TransitionGroup>
    </div>
    <h2 v-else style="color: red;">
        Список постов пуст
    </h2>
</template>

<script>
import PostItem from './PostItem.vue';

    export default {
        emits: [
            'remove'
        ],
        props: {
            posts: {
                type: Array,
                required: true,
            }
        },
        components: { PostItem }
}
</script>

<style scoped>
.post-list-item {
    display: inline-block;
}
.post-list-move,
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.4s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
</style>