import { defineStore } from 'pinia';
import { ref } from 'vue';

export enum MessageType {
	Success = 'success',
	Error = 'error'
}

export const useMessageStore = defineStore('message', () => {
	const message = ref('');
	const messageType = ref(MessageType.Success);
	const messageVisible = ref(false);

	const sendMessage = (msg: string, msgType: MessageType = MessageType.Success): void => {
		message.value = msg;
		messageType.value = msgType;
		messageVisible.value = true;

		setTimeout(() => {
			messageVisible.value = false;
		}, 5000);
	};

	return { message, messageType, messageVisible, sendMessage };
});
