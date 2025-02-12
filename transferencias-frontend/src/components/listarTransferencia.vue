<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Transferências agendadas</h2>

    <!-- Botão Novo Agendamento -->
    <div class="text-end mt-4">
      <router-link to="/agendar" class="btn btn-primary">Novo Agendamento</router-link>
    </div>

    <!-- Verifica se não há transferências -->
    <div v-if="transferencias.length === 0" class="alert alert-warning mt-3" role="alert">
      Nenhuma transferência agendada.
    </div>

    <!-- Extrato de Transferências -->
    <div class="card mt-4">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Conta Origem</th>
                <th>Conta Destino</th>
                <th>Valor Bruto</th>
                <th>Taxa (%)</th>
                <th>Valor Líquido</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="transferencia in transferenciasPorPagina" :key="transferencia.id">
                <td>{{ transferencia.contaOrigem }}</td>
                <td>{{ transferencia.contaDestino }}</td>
                <td>{{ transferencia.valorBrutoFormatado }}</td>
                <td>{{ transferencia.taxaFormatada }}%</td>
                <td>{{ transferencia.valorLiquidoFormatado }}</td>
                <td>
                  <button type="button" class="btn btn-info btn-sm" @click="abrirModal(transferencia)">
                    Ver Detalhes
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Paginação -->
    <nav aria-label="Page navigation" class="mt-4">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: paginaAtual === 1 }">
          <button class="page-link" @click="mudarPagina(paginaAtual - 1)" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        <!-- Exibe a página atual e as páginas disponíveis -->
        <li v-for="page in paginasVisiveis" :key="page" class="page-item" :class="{ active: paginaAtual === page }">
          <button class="page-link" @click="mudarPagina(page)">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ disabled: paginaAtual === totalPaginas }">
          <button class="page-link" @click="mudarPagina(paginaAtual + 1)" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>

    <!-- Modal de Detalhes da Transferência -->
    <div class="modal fade" id="detalhesModal" tabindex="-1" aria-labelledby="detalhesModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="detalhesModalLabel">Detalhes da Transferência</h5>
            <button type="button" class="btn-close" @click="fecharModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div v-if="transferenciaSelecionada">
              <p><strong>Conta origem:</strong> {{ transferenciaSelecionada.contaOrigem }}</p>
              <p><strong>Conta destino:</strong> {{ transferenciaSelecionada.contaDestino }}</p>
              <p><strong>Valor Bruto:</strong> {{ transferenciaSelecionada.valorBrutoFormatado }}</p>
              <p><strong>Valor Líquido:</strong> {{ transferenciaSelecionada.valorLiquidoFormatado }}</p>
              <p><strong>Taxa:</strong> {{ transferenciaSelecionada.taxaFormatada }}%</p>
              <p><strong>Data Transferência:</strong> {{ transferenciaSelecionada.dataTransferenciaFormatada }}</p>
              <p><strong>Data Agendamento:</strong> {{ transferenciaSelecionada.dataAgendamentoFormatada }}</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="fecharModal">Fechar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Modal } from 'bootstrap';

export default {
  data() {
    return {
      transferencias: [], 
      transferenciaSelecionada: null,
      paginaAtual: 1,
      itensPorPagina: 5,
    };
  },
  computed: {
    totalPaginas() {
      return Math.ceil(this.transferencias.length / this.itensPorPagina);
    },
    transferenciasPorPagina() {
      const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
      const fim = inicio + this.itensPorPagina;
      return this.transferencias.slice(inicio, fim);
    },
    paginasVisiveis() {
      const paginas = [];
      for (let i = 1; i <= this.totalPaginas; i++) {
        paginas.push(i);
      }
      return paginas;
    }
  },
  mounted() {
    this.carregarTransferencias();
  },
  methods: {
    // Carregar as transferências
    async carregarTransferencias() {
      try {
        const response = await axios.get('http://localhost:8080/api/transferencias');
        this.transferencias = response.data;
      } catch (error) {
        console.error("Erro ao carregar transferências:", error);
      }
    },

    // Alterar a página
    mudarPagina(pagina) {
      if (pagina >= 1 && pagina <= this.totalPaginas) {
        this.paginaAtual = pagina;
      }
    },

    // Abrir o modal com os detalhes da transferência
    abrirModal(transferencia) {
      this.transferenciaSelecionada = transferencia;
      const modalElement = document.getElementById('detalhesModal');
      const modal = new Modal(modalElement);
      modal.show();
    },

    // Fechar o modal
    fecharModal() {
      this.transferenciaSelecionada = null;
      const modalElement = document.getElementById('detalhesModal');
      const modal = Modal.getInstance(modalElement); 
      modal.hide(); 
    }
  }
};
</script>

<style scoped>
/* Limitar o tamanho da tela do container */
.container {
  max-width: 900px; /* Limita a largura do container */
}

/* Estilo para o título */
h2 {
  font-weight: 600;
  color: #333;
}

/* Estilo para o botão de "Novo Agendamento" */
.text-end .btn {
  font-weight: 600;
  padding: 10px 20px;
}

/* Estilo para a tabela */
.table {
  font-size: 14px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
}

.table th {
  background-color: #f1f1f1;
  text-align: center;
}

.table td {
  text-align: center;
}

.table-bordered {
  border: 1px solid #ddd;
}

/* Botões estilizados */
button {
  width: 120px;
}

button:hover {
  transform: scale(1.05);
}

/* Modal  */
.modal-content {
  border-radius: 10px;
}

.modal-header {
  background-color: #f7f7f7;
  border-bottom: 1px solid #ddd;
}

.modal-footer {
  border-top: 1px solid #ddd;
}

/* Paginação */
.pagination {
  display: flex;
  justify-content: center;
  padding-top: 10px;
}

.page-item.disabled .page-link {
  pointer-events: none;
  opacity: 0.5;
}

/* Responsividade */
@media (max-width: 768px) {
  .container {
    padding-left: 10px;
    padding-right: 10px;
  }

  .table th, .table td {
    font-size: 12px;
  }

  button {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
