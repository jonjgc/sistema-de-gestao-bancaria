<template>
  <v-container>
    <v-form v-model="valid" @submit.prevent="realizarTransacao">
      <v-text-field
        label="Número da Conta"
        v-model="numeroConta"
        type="number"
        required
      />
      <v-text-field
        label="Valor da Transação"
        v-model="valor"
        type="number"
        required
      />
      <v-select
        label="Tipo de Transação"
        v-model="tipoTransacao"
        :items="['Crédito', 'Débito']"
        required
      />
      <v-btn :disabled="!valid" type="submit">Realizar Transação</v-btn>
    </v-form>

    <!-- Resultado da transação -->
    <v-alert
      v-if="status"
      :type="status.success ? 'success' : 'error'"
      dismissible
    >
      {{ status.message }}
    </v-alert>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'TransacaoForm',
  setup() {
    const valid = ref(false);
    const numeroConta = ref<number | null>(null);
    const valor = ref<number | null>(null);
    const tipoTransacao = ref<string>('');
    const status = ref<{ success: boolean; message: string } | null>(null);

    const realizarTransacao = async () => {
      try {
        const response = await axios.post('http://localhost:3000/transacao', {
          numero_conta: numeroConta.value,
          valor: valor.value,
          tipo_transacao: tipoTransacao.value,
        });

        // Exibe sucesso ou erro com base na resposta
        status.value = {
          success: true,
          message: 'Transação realizada com sucesso!',
        };
        console.log('Transação realizada:', response.data);
      } catch (error) {
        // Exibe o erro caso haja falha
        status.value = {
          success: false,
          message: 'Erro ao realizar transação.',
        };
        console.error('Erro ao realizar transação:', error);
      }
    };

    return {
      valid,
      numeroConta,
      valor,
      tipoTransacao,
      status,
      realizarTransacao,
    };
  },
});
</script>

<style scoped>

</style>
