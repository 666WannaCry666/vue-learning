import { ref, computed } from 'vue';

const useSortedPosts = (posts) => {
    const selectedSort = ref('')
    const sortedPosts = computed(() => {
        return [...posts].sort((post1, post2) => post1[selectedSort.value]?.localeCompare(post2[selectedSort.value]))
    })

    return {
        selectedSort, sortedPosts
    }
}

export default useSortedPosts
