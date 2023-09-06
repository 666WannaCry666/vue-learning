<template>
    <div class="navbar">
        <div @click="$router.push('/')" class="icon">Vue 3</div>
        <div class="navbar__btns">
            <MyButton @click="$router.push('/posts')">Посты</MyButton>
            <MyButton @click="$router.push('/about')">О сайте</MyButton>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Navbar',
    }
</script>

<style scoped>
.icon {
    color: teal;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 24px;
    cursor: pointer;
}

.icon:hover {
    color: rgb(2, 192, 192);
}

.navbar {
    height: 50px;
    background: lightgray;
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
    padding: 0 15px;
}

.navbar__btns {
    margin-left: auto;
    display: flex;
    gap: 10px;
}
</style>