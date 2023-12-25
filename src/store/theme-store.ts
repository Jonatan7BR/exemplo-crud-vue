import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {
	const isDarkMode = ref(false);

	const setTheme = (darkMode: boolean): void => {
		isDarkMode.value = darkMode;
	};

	const toggleTheme = (): void => {
		isDarkMode.value = !isDarkMode.value;
	};

	return { isDarkMode, setTheme, toggleTheme };
});
