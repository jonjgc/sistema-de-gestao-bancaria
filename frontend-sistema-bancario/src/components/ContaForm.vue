<template>
    <v-container>
      <!-- Mensagem de sucesso ou erro -->
      <v-alert
        v-if="mensagem"
        :type="tipoMensagem"
        dismissible
        class="mb-4"
      >
        {{ mensagem }}
      </v-alert>
  
      <!-- Formulário -->
      <v-form v-model="valid" @submit.prevent="criarConta">
        <!-- Campo para o número da conta -->
        <v-text-field
          label="Número da Conta"
          v-model="numeroConta"
          type="number"
          required
        ></v-text-field>
  
        <!-- Campo para o saldo inicial -->
        <v-text-field
          label="Saldo Inicial"
          v-model="saldo"
          type="number"
          required
        ></v-text-field>
  
        <v-btn :disabled="!valid" type="submit" color="primary">
          Criar Conta
        </v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import axios from 'axios';
  
  export default defineComponent({
    name: 'ContaForm',
    setup() {
      // Referências reativas para os dados do formulário
      const valid = ref(false);
      const numeroConta = ref<number | null>(null);
      const saldo = ref<number | null>(null);
      const mensagem = ref<string | null>(null);
      const tipoMensagem = ref<string>(''); // 'success' ou 'error'
  
      // Função para criar conta
      const criarConta = async () => {
        try {
          // Requisição para criar a conta no backend
          const response = await axios.post('http://localhost:3000/conta', {
            numero_conta: numeroConta.value,
            saldo: saldo.value,
          });
  
          // Atualizando mensagem de sucesso
          mensagem.value = `Conta criada com sucesso!`;
          tipoMensagem.value = 'success';
  
          // Resetando os valores após sucesso
          numeroConta.value = null;
          saldo.value = null;
          valid.value = false;
        } catch (error) {
          // Atualizando mensagem de erro
          mensagem.value =
            error.response?.data?.message || 'Erro ao criar conta.';
          tipoMensagem.value = 'error';
        }
      };
  
      return {
        valid,
        numeroConta,
        saldo,
        criarConta,
        mensagem,
        tipoMensagem,
      };
    },
  });
  </script>
  
  <style scoped>

  </style>
  