<template>
    <button
        type="button"
        class="toggle-theme material-symbols-outlined"
        :title="buttonTitle"
        @click="changeTheme()"
    >
        {{ isDarkMode ? 'dark_mode' : 'light_mode' }}
    </button>
</template>

<style scoped lang="scss">
.toggle-theme {
    cursor: pointer;
    background-color: transparent;
    border: none;
    outline: none;
    color: #FFF;
}
</style>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useThemeStore } from '@/store/theme-store';
import { computed } from 'vue';

const themeStore = useThemeStore();
const { isDarkMode } = storeToRefs(themeStore);
const buttonTitle = computed(() => isDarkMode ? 'Mudar para tema claro' : 'Mudar para tema escuro');

const changeTheme = (): void => {
    themeStore.toggleTheme();
};
</script>
