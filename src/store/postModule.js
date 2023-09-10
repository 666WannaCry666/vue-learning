import axios from 'axios'

const postModule = {
    state: () => {
        return {
            posts: [],
            isPostsLoading: false,
            selectedSort: '',
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По содержанию'},
                {value: 'id', name: 'По номеру'},
            ],
            searchQuery: '',
            page: 1,
            limit: 10,
            totalPages: 0,
        }
    },
    getters: {
        sortedPosts(state) {
            if(state.selectedSort === 'id') {
                return [...state.posts].sort((post1, post2) => post1[state.selectedSort] - post2[state.selectedSort])
            }
            
            return [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, bool) {
            state.isPostsLoading = bool;
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },
        setPage(state, page) {
            state.page = page;
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages;
        }
    },
    actions: {
        async fetchPosts({state, commit}) {
            commit('setLoading', true);
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                });
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts', response.data)
            } catch (e) {
                alert('Ошибка')
            } finally {
                commit('setLoading', false)
            }
        },
        async loadMorePosts({state, commit}) {
            commit('setPage', state.page + 1)
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                });
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / this.limit))
                commit('setPosts', [...state.posts, ...response.data]);
            } catch (e) {
                alert('Ошибка')
            }
        },
    },
    namespaced: true
}

export default postModule;