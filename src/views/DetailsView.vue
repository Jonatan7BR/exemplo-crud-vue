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

        <div class="span2">
            <button type="submit">{{ buttonLabel }}</button>
        </div>
    </form>
</template>

<style scoped lang="scss">
.grid2 {
    display: grid;
    grid-template-columns: auto auto;
    gap: 5px 10px;
    align-items: center;

    input, button, select, option {
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
}
</style>

<script setup lang="ts">
import type { Person } from '@/models/person';
import { STATES } from '@/utils/states';
import { cpfValid, phoneValid } from '@/utils/validation';
import moment from 'moment';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const FAKE_DATA: Person = {
  id: 1,
  name: 'Olivia Analu Moreira',
  cpf: '84427553303',
  birthday: moment('1997-06-24').toDate(),
  email: 'oliviaanalumoreira@advogadostb.com.br',
  phone: '48988129805',
  city: 'Florianópolis',
  state: 'SC'
};

const route = useRoute();
const router = useRouter();

const { id } = route.params;

const title = computed(() => id ? 'Editar cadastro' : 'Cadastrar pessoa');
const buttonLabel = computed(() => id ? 'Atualizar' : 'Cadastrar');

const states = ref(STATES.sort((a, b) => a.name.localeCompare(b.name)));

const name = ref('');
const cpf = ref('');
const birthday = ref('');
const email = ref('');
const phone = ref('');
const city = ref('');
const state = ref('');

const sendData = (): void => {
    if (!cpfValid(cpf.value) || !phoneValid(phone.value)) {
        return;
    }

    router.push('/');
};

onMounted(() => {
    if (id) {
        name.value = FAKE_DATA.name;
        cpf.value = FAKE_DATA.cpf;
        birthday.value = moment(FAKE_DATA.birthday).format('YYYY-MM-DD');
        email.value = FAKE_DATA.email;
        phone.value = FAKE_DATA.phone;
        city.value = FAKE_DATA.city;
        state.value = FAKE_DATA.state;
    }
});
</script>
