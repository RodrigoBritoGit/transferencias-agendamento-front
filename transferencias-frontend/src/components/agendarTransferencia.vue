<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">Agendar Transferência</h2>

    <!-- Exibir mensagem de sucesso -->
    <div v-if="mensagemSucesso" class="alert alert-success text-center" role="alert">
      {{ mensagemSucesso }}
    </div>

    <!-- Exibir mensagem de erro -->
    <div v-if="mensagemErro" class="alert alert-danger text-center mt-3" role="alert">
      {{ mensagemErro }}
    </div>

    <div class="row justify-content-center">
      <div class="col-md-6">
        <form @submit.prevent="agendarTransferencia" class="shadow p-4 rounded bg-light">
          <div class="mb-3">
            <label for="contaOrigem" class="form-label">Conta Origem</label>
            <input v-model="contaOrigem" type="text" id="contaOrigem" class="form-control" placeholder="Conta Origem" required />
          </div>

          <div class="mb-3">
            <label for="contaDestino" class="form-label">Conta Destino</label>
            <input v-model="contaDestino" type="text" id="contaDestino" class="form-control" placeholder="Conta Destino" required />
          </div>

          <div class="mb-3">
            <label for="valorBruto" class="form-label">Valor</label>
            <input v-model="valorBruto" type="number" id="valorBruto" class="form-control" placeholder="Valor" required />
          </div>

          <div class="mb-3">
            <label for="dataTransferencia" class="form-label">Data de Transferência</label>
            <input v-model="dataTransferencia" type="date" id="dataTransferencia" class="form-control" required />
          </div>

          <div class="mb-3">
            <label for="valorLiquido" class="form-label">Valor Líquido (Após Taxa)</label>
            <input v-model="valorLiquido" type="text" id="valorLiquido" class="form-control" :readonly="true" disabled />
          </div>

          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary">Agendar</button>
            <router-link to="/" class="btn btn-secondary">Voltar para Listagem</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      contaOrigem: '',
      contaDestino: '',
      valorBruto: '',
      dataTransferencia: '',
      valorLiquido: '', 
      mensagemSucesso: '',
      mensagemErro: ''
    };
  },
  watch: {
    valor() {
      this.calcularValorLiquido();
    },
    dataTransferencia() {
      this.calcularValorLiquido();
    }
  },
  methods: {
    calcularValorLiquido() {
      if (this.valorBruto && this.dataTransferencia) {
        const taxa = this.calcularTaxa(this.dataTransferencia);
        
        // Verificar se a taxa está fora dos limites
        if (taxa === null) {
          this.mensagemErro = 'A data de transferência está fora do limite permitido.';
          this.valorLiquido = '';
        } else {
          this.valorLiquido = (this.valorBruto - (this.valorBruto * taxa)).toFixed(2);
          this.mensagemErro = ''; 
        }
      }
    },

    calcularTaxa(dataTransferencia) {
      const hoje = new Date();
      const dataTransf = new Date(dataTransferencia); 
      const diasDiferenca = (dataTransf - hoje) / (1000 * 60 * 60 * 24);

      if (diasDiferenca < 0) return 0.025; // Taxa para datas passadas
      if (diasDiferenca >= 1 && diasDiferenca <= 10) return 0.00; // Taxa para 1 a 10 dias
      if (diasDiferenca >= 11 && diasDiferenca <= 20) return 0.082; // Taxa para 11 a 20 dias
      if (diasDiferenca >= 21 && diasDiferenca <= 30) return 0.069; // Taxa para 21 a 30 dias
      if (diasDiferenca >= 31 && diasDiferenca <= 40) return 0.047; // Taxa para 31 a 40 dias
      if (diasDiferenca >= 41 && diasDiferenca <= 50) return 0.017; // Taxa para 41 a 50 dias

      return null; 
    },

    async agendarTransferencia() {
      // Verifica se já há mensagem de erro antes de tentar enviar
      if (this.mensagemErro) {
        return; 
      }

      try {
        const transferencia = {
          contaOrigem: this.contaOrigem,
          contaDestino: this.contaDestino,
          valorBruto: parseFloat(this.valorBruto),
          dataTransferencia: new Date(this.dataTransferencia), 
          valorLiquido: this.valorLiquido
        };

        const response = await axios.post('http://localhost:8080/api/transferencias', transferencia);

        if (response && response.data) {
          this.mensagemSucesso = 'Transferência agendada com sucesso!'; 
          this.mensagemErro = ''; 
          setTimeout(() => {
            this.$router.push('/'); 
          }, 2000);
        }
      } catch (error) {
        if (error.response) {
          this.mensagemErro = error.response.data; 
        } else {
          this.mensagemErro = 'Ocorreu um erro ao tentar agendar a transferência. Tente novamente mais tarde.';
        }
        this.mensagemSucesso = ''; 
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px; /* Limita a largura do formulário */
}

h2 {
  font-weight: 500;
  color: #333;
}

.form-control {
  box-shadow: none; /* Remove sombra dos campos */
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

button {
  width: 48%;
}

.router-link {
  text-align: center;
}
</style>
