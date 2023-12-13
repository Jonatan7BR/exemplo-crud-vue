<template>
    <div class="home-page">
        <h1>Pessoas cadastradas</h1>

        <div class="create-new">
            <button type="button" @click="goToNewPage()">Criar novo cadastro</button>
        </div>

        <table class="peopletable">
            <thead>
                <tr>
                    <th>CPF</th>
                    <th>Nome</th>
                    <th>Cidade</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="person in peopleData">
                    <td>{{ cpfFormat(person.cpf) }}</td>
                    <td>{{ person.name }}</td>
                    <td>{{ person.city }}, {{ person.state }}</td>
                    <td><button type="button" @click="goToEditPage(person.id)">Editar</button></td>
                </tr>
                <tr v-if="peopleData.length === 0">
                    <td colspan="4">Não há pessoas cadastradas.</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped lang="scss">
.create-new {
    margin: 10px auto;

    button {
        font-size: 14pt;
    }
}

.peopletable {
    border-collapse: collapse;

    &, th, td {
        border: 1px solid var(--table-border);
    }

    th, td {
        padding: 5px;
    }
}

</style>

<script setup lang="ts">
import moment from 'moment';
import { ref } from 'vue';

import type { Person } from '@/models/person';
import { cpfFormat } from '@/utils/data-format';
import { useRouter } from 'vue-router';

const FAKE_DATA: Person[] = [
    {
        id: 1,
        name: 'Olivia Analu Moreira',
        cpf: '84427553303',
        birthday: moment('1997-06-24').toDate(),
        email: 'oliviaanalumoreira@advogadostb.com.br',
        phone: '48988129805',
        city: 'Florianópolis',
        state: 'SC'
    },
    {
        id: 2,
        name: 'Catarina Cláudia Bernardes',
        cpf: '05185344130',
        birthday: moment('1956-03-06').toDate(),
        email: 'catarinaclaudiabernardes@aguabr.com.br',
        phone: '83986028722',
        city: 'Campina Grande',
        state: 'PB'
    },
    {
        id: 3,
        name: 'Jaqueline Mariane Yasmin Martins',
        cpf: '43852716748',
        birthday: moment('1956-01-14').toDate(),
        email: 'jaqueline.mariane.martins@silnave.com.br',
        phone: '91991024603',
        city: 'Belém',
        state: 'PA'
    },
    {
        id: 4,
        name: 'Vicente Oliver Caio Lopes',
        cpf: '90231999283',
        birthday: moment('1971-11-16').toDate(),
        email: 'vicente.oliver.lopes@weatherford.com',
        phone: '91989283146',
        city: 'Castanhal',
        state: 'PA'
    },
    {
        id: 5,
        name: 'Caroline Elisa Gabriela Moraes',
        cpf: '51679864432',
        birthday: moment('1983-02-23').toDate(),
        email: 'caroline_moraes@nogueiramoura.com.br',
        phone: '92995800236',
        city: 'Manaus',
        state: 'AM'
    }
];

const router = useRouter();

const peopleData = ref(FAKE_DATA);

const goToEditPage = (id: number): void => {
    router.push(`/editar/${id}`);
};

const goToNewPage = (): void => {
    router.push('/novo');
};
</script>
