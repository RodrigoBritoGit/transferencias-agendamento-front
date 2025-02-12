<template>
  <div>
    <!-- Barra de Navegação -->
    <nav class="navbar navbar-expand-lg navbar-light fixed-top bg-primary shadow-sm">
      <div class="container">
        <a class="navbar-brand text-white" href="#">Transferências</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link text-white" to="/">Listagem</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-white" to="/agendar">Novo Agendamento</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Conteúdo principal -->
    <div class="container mt-5 pt-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
/* Barra de navegação */
.navbar {
  background-color: #0066cc; /* Azul profissional */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra suave */
}

.navbar .navbar-brand {
  font-weight: bold;
  font-size: 1.3rem;
}

.navbar .nav-link {
  font-size: 1.1rem;
  font-weight: 500;
  padding: 10px 15px;
  transition: color 0.3s ease;
}

.navbar .nav-link:hover {
  color: #ffd700; /* Cor dourada para o hover */
}

.navbar .navbar-toggler-icon {
  background-color: #fff; /* Cor da icon do botão */
}

/* Contêiner de conteúdo */
.container {
  max-width: 960px;
}

/* Ajustes para o espaçamento do conteúdo principal */
.mt-5 {
  margin-top: 80px; /* Para compensar o cabeçalho fixo */
}

/* Estilo para o fundo da página */
body {
  background-color: #f8f9fa; /* Cor de fundo suave */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  line-height: 1.6;
}

/* Ajustando os links de navegação em dispositivos móveis */
@media (max-width: 768px) {
  .navbar .nav-link {
    font-size: 1rem;
  }
}
</style>
