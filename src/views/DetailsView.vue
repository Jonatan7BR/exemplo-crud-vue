<template>
	<h1>{{ title }}</h1>

	<form class="grid2" @submit.prevent="sendData()">
		<p>Nome:</p>
		<div>
			<input type="text" v-model="name" required />
		</div>

		<p>CPF:</p>
		<div>
			<input type="text" v-model="cpf" inputmode="numeric" pattern="\d{11}" required />
		</div>

		<p>Data de nascimento:</p>
		<div>
			<input type="date" v-model="birthday" required />
		</div>

		<p>E-mail:</p>
		<div>
			<input type="email" v-model="email" required />
		</div>

		<p>Telefone:</p>
		<div>
			<input type="tel" v-model="phone" required />
		</div>

		<p>Cidade:</p>
		<div>
			<input type="text" v-model="city" required />
		</div>

		<p>Estado:</p>
		<div>
			<select v-model="state">
				<option v-for="state of states" :value="state.abbr">{{ state.name }}</option>
			</select>
		</div>

		<div class="span2 button-row">
			<button type="submit">{{ buttonLabel }}</button>
			<button v-if="deletable" type="button" @click="() => confirmDelete()">Excluir</button>
		</div>
	</form>

	<ConfirmModal :visible="deleteModalVisible" :dialog-text="deleteModalText" @confirm="e => deleteData(e)" />
</template>

<style scoped lang="scss">
.grid2 {
	display: grid;
	grid-template-columns: auto auto;
	gap: 5px 10px;
	align-items: center;

	input,
	button,
	select,
	option {
		font-size: 14pt;
	}

	:nth-child(odd) {
		display: flex;
		justify-content: flex-end;
	}

	:nth-child(even) {
		display: flex;
		justify-content: flex-start;
	}

	.span2 {
		grid-column: span 2;
		display: flex;
		justify-content: center;
	}

	.button-row {
		display: flex;
		gap: 5px;
	}
}
</style>

<script setup lang="ts">
import ConfirmModal from '@/components/ConfirmModal.vue';
import type { PersonBody } from '@/models/person';
import { useLoaderStore } from '@/store/loader-store';
import { MessageType, useMessageStore } from '@/store/message-store';
import { usePeopleStore } from '@/store/people-store';
import { STATES } from '@/utils/states';
import { cpfValid, phoneValid } from '@/utils/validation';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const loaderStore = useLoaderStore();
const messageStore = useMessageStore();

const peopleStore = usePeopleStore();
const { person } = storeToRefs(peopleStore);

const { id } = route.params;

const deleteModalVisible = ref(false);

const title = computed(() => (id ? 'Editar cadastro' : 'Cadastrar pessoa'));
const buttonLabel = computed(() => (id ? 'Atualizar' : 'Cadastrar'));
const deletable = computed(() => !!id);

const states = ref(STATES.sort((a, b) => a.name.localeCompare(b.name)));
const deleteModalText = 'Deseja excluir este cadastro?';

const name = ref('');
const cpf = ref('');
const birthday = ref('');
const email = ref('');
const phone = ref('');
const city = ref('');
const state = ref('');

const sendData = async (): Promise<void> => {
	if (!cpfValid(cpf.value)) {
		messageStore.sendMessage('O número do CPF está inválido', MessageType.Error);
		return;
	}
	if (!phoneValid(phone.value)) {
		messageStore.sendMessage('O número de telefone está em um formato inválido', MessageType.Error);
		return;
	}

	const body: PersonBody = {
		name: name.value,
		cpf: cpf.value,
		birthday: birthday.value,
		email: email.value,
		phone: phone.value,
		city: city.value,
		state: state.value
	};
	loaderStore.setLoading(true);
	if (id) {
		try {
			await peopleStore.updatePerson(+id, body);
			messageStore.sendMessage('Dados atualizados com sucesso');
			router.push('/');
		} catch {
			messageStore.sendMessage('Não foi possível atualizar os dados do cadastro', MessageType.Error);
		} finally {
			loaderStore.setLoading(false);
		}
	} else {
		try {
			await peopleStore.registerPerson(body);
			messageStore.sendMessage('Dados cadastrados com sucesso');
			router.push('/');
		} catch {
			messageStore.sendMessage('Não foi possível realizar o cadastro dos dados.', MessageType.Error);
		} finally {
			loaderStore.setLoading(false);
		}
	}
};

const confirmDelete = (): void => {
	deleteModalVisible.value = true;
};

const deleteData = async (confirmed: boolean): Promise<void> => {
	deleteModalVisible.value = false;
	if (!confirmed) {
		return;
	}
	loaderStore.setLoading(true);
	try {
		await peopleStore.removePerson(+id);
		messageStore.sendMessage('Dados excluídos com sucesso');
		router.push('/');
	} catch {
		messageStore.sendMessage('Não foi possível excluir os dados', MessageType.Error);
	} finally {
		loaderStore.setLoading(false);
	}
};

onMounted(async () => {
	if (Array.isArray(id) || !parseInt(id)) {
		router.push('/');
		return;
	}
	if (id) {
		loaderStore.setLoading(true);
		try {
			await peopleStore.getPerson(+id);
		} catch {
			messageStore.sendMessage('Ocorreu um erro ao carregar os dados', MessageType.Error);
		} finally {
			loaderStore.setLoading(false);
		}
	}
});

watch(person, () => {
	if (person.value) {
		name.value = person.value.name;
		cpf.value = person.value.cpf;
		birthday.value = person.value.birthday;
		email.value = person.value.email;
		phone.value = person.value.phone;
		city.value = person.value.city;
		state.value = person.value.state;
	}
});
</script>
