<template>
    <header class="page-header">
        <h1 class="title _nomargin">Exemplo de App CRUD</h1>
        <div class="themetoggler">
            <ThemeToggle />
        </div>
    </header>
</template>

<style scoped lang="scss">
.page-header {
    width: 100%;
    background-color: #00008B;
    display: grid;
    grid-template-columns: auto max-content;
    align-items: center;

    > .title {
        text-align: center;
        font-size: 22pt;
        color: #FFF;
        font-family: var(--serif);
    }

    > .themetoggler {
        padding: 5px;
    }
}
</style>

<script setup lang="ts">
import ThemeToggle from './ThemeToggle.vue';
</script>
