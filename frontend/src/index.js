// Definindo porta para as requisções na API
const portaHttp = 'http://localhost:5294';
const portaHttps = 'https://localhost:7076';


// Variáveis globais para paginação
let currentPage = 1;
let allPontos = [];
const itemsPerPage = 6;


// ==================== Funções de inicialização ====================

// Carrega os estados quando a página é carregada
document.addEventListener('DOMContentLoaded', () => {
   loadStates();
});


// ==================== Funções de renderização e paginação ====================

// Função para exibir a página atual e cards dos pontos turisticos
function createCard(ponto) {
   // Criação do card
   const pontoElement = document.createElement('div');
   pontoElement.classList.add('spot-card');

   // Criação do template de HTML para o card
   const createdAt = new Date(ponto.createdAt).toLocaleDateString('pt-BR');
   const description = ponto.description.length > 70
      ? ponto.description.slice(0, 70) + "..."
      : ponto.description;

   pontoElement.innerHTML = `
      <div class='spot-image'>
         <img src="${portaHttp}${ponto.imagePath}" alt="Imagem do Ponto Turístico">
      </div>
      <div class="card-name">
         <h3>${ponto.name}</h3>
      </div>
      <div class="spot-content">
         <p><strong>Descrição: </strong>${description}</p>
         <p><strong>Localização: </strong>${ponto.location}</p>
         <p><strong>Cidade: </strong>${ponto.city}</p>
         <p><strong>Estado: </strong>${ponto.state}</p>
         <p><strong>Cadastrado em: </strong>${createdAt}</p>
      </div>
      <div class="card-btn">
         <button class="btn btn-primary" onclick="viewDetails('${ponto.id}')">Ver Detalhes</button>
         <button onclick="deletePonto('${ponto.id}')" class="btn btn-danger">Excluir</button>
      </div>
   `;
   return pontoElement;
}

function displayCurrentPage() {
   const spotsGrid = document.getElementById('spotsGrid');
   const noResults = document.getElementById('noResults');

   spotsGrid.innerHTML = ''; // Limpar conteúdo anterior
   noResults.style.display = 'none'; // Esconder mensagem de sem resultados

   const startIndex = (currentPage - 1) * itemsPerPage;
   const endIndex = startIndex + itemsPerPage;
   const currentPagePontos = allPontos.slice(startIndex, endIndex);

   if (currentPagePontos.length > 0) {
      currentPagePontos.forEach(ponto => {
         const pontoElement = createCard(ponto);
         spotsGrid.appendChild(pontoElement);
      });
   } else {
      noResults.style.display = 'block';
      document.getElementById('pagination').innerHTML = '';
   }
}

// Função para atualizar os controles de paginação
function updatePaginationControls() {
   const totalPages = Math.ceil(allPontos.length / itemsPerPage);
   const paginationContainer = document.getElementById('pagination');

   if (totalPages <= 1) {
      paginationContainer.innerHTML = '';
      return;
   }

   let paginationHTML = `
      <div class="pagination">
         <button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
            Anterior
         </button>
         <span>Página ${currentPage} de ${totalPages}</span>
         <button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
            Próxima
         </button>
      </div>
   `;

   paginationContainer.innerHTML = paginationHTML;
}


// Função para visualizar detalhes do ponto turistico
async function viewDetails(pontoId) {
   try {
      const response = await fetch(`${portaHttp}/api/Pontos/${pontoId}`);

      if (!response.ok) {
         throw new Error('Erro ao buscar detalhes do ponto turístico');
      }

      const ponto = await response.json();
      const createdAt = new Date(ponto.createdAt).toLocaleDateString('pt-BR');

      // Verificar se os elementos existem antes de acessá-los
      const nameElement = document.getElementById('detailName');
      const descriptionElement = document.getElementById('detailDescription');
      const locationElement = document.getElementById('detailLocation');

      if (!nameElement || !descriptionElement || !locationElement) {
         throw new Error('Elementos do modal não encontrados');
      }

      // Preencher os detalhes no modal
      nameElement.textContent = ponto.name;
      descriptionElement.textContent = ponto.description;
      locationElement.textContent = ponto.location;

      // Abrir o modal
      openModal('detailsModal');

   } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao carregar detalhes do ponto turístico');
   }
}


// Função para mudar de página
function changePage(newPage) {
   const totalPages = Math.ceil(allPontos.length / itemsPerPage);

   if (newPage >= 1 && newPage <= totalPages) {
      currentPage = newPage;
      displayCurrentPage();
      updatePaginationControls();
      window.scrollTo({
         top: document.getElementById('search').offsetTop,
         behavior: 'smooth'
      });
   }
}


// ==================== Funções de requisição ====================


// Função para recuperar todos os pontos
async function recuperarDados() {
   try {
      const response = await fetch(`${portaHttp}/api/Pontos`);
      const data = await response.json();

      const spotsGrid = document.getElementById('spotsGrid');
      const noResults = document.getElementById('noResults');

      // Limpando ambos os elementos antes de qualquer exibição
      spotsGrid.innerHTML = '';
      noResults.style.display = 'none';

      if (data && data.pontos && data.pontos.length > 0) {
         allPontos = data.pontos;
         displayCurrentPage();
         updatePaginationControls();
      } else {
         allPontos = [];
         document.getElementById('pagination').innerHTML = '';
         noResults.style.display = 'block';
      }
   } catch (error) {
      console.error('Erro:', error);
      document.getElementById('pagination').innerHTML = '';
      noResults.style.display = 'block';
   }
}


// Função responsavel por fazer a busca de um ponto especifico
async function searchSpots() {
   const searchTerm = document.getElementById('searchInput').value.trim();
   const spotsGrid = document.getElementById('spotsGrid');
   const noResults = document.getElementById('noResults');

   // Limpa o estado atual
   spotsGrid.innerHTML = '';
   noResults.style.display = 'none';
   document.getElementById('pagination').innerHTML = '';

   try {
      if (!searchTerm) {
         await recuperarDados();
         return;
      }

      const response = await fetch(`${portaHttp}/api/Pontos/${encodeURIComponent(searchTerm)}/search`);

      if (!response.ok) {
         if (response.status === 404) {
            allPontos = [];
            noResults.style.display = 'block';
            return;
         }
         throw new Error(`Erro na API: ${response.statusText}`);
      }

      const data = await response.json();

      if (data && data.pontos && data.pontos.length > 0) {
         allPontos = data.pontos;
         currentPage = 1;
         displayCurrentPage();
         updatePaginationControls();
      } else {
         allPontos = [];
         noResults.style.display = 'block';
      }
   } catch (error) {
      console.error('Erro ao buscar pontos turísticos:', error);
      allPontos = [];
      noResults.style.display = 'block';
      alert('Ocorreu um erro ao buscar os dados. Por favor, tente novamente.');
   }
}


// Função para registrar um novo ponto turístico
async function registerPonto(event) {
   event.preventDefault();

   const formData = new FormData();
   formData.append('name', document.getElementById('pontoName').value);
   formData.append('description', document.getElementById('pontoDescription').value);
   formData.append('location', document.getElementById('pontoLocation').value);
   formData.append('city', document.getElementById('pontoCity').value);
   formData.append('state', document.getElementById('pontoState').value);

   const imageInput = document.getElementById('pontoImage');
   if (imageInput.files.length > 0) {
      formData.append('image', imageInput.files[0]);
      formData.append('ImagePath', 'img');
   }

   try {
      const response = await fetch('http://localhost:5294/api/Pontos', {
         method: 'POST',
         body: formData
      });

      console.log('Status da resposta:', response.status);

      // Verifica se a resposta é bem-sucedida (status 2xx)
      if (response.ok) {
         // Fecha o modal
         closeModal('registerModal');

         // Limpa o formulário
         document.getElementById('pontoForm').reset();

         // Atualiza a lista de pontos
         await recuperarDados();

         // Mostra mensagem de sucesso
         alert('Ponto turístico registrado com sucesso!');
      } else {
         // Se a resposta não for bem-sucedida, tenta ler o corpo da resposta para obter detalhes do erro
         const errorData = await response.json().catch(() => null);
         throw new Error(errorData?.messages?.join(', ') || 'Erro ao registrar ponto turístico');
      }
   } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao registrar ponto turístico: ' + error.message);
   }
}


async function deletePonto(pontoId) {
   const confirmation = confirm("Tem certeza que deseja excluir este ponto turístico?");
   if (!confirmation) return;

   try {
      const response = await fetch(`${portaHttp}/api/Pontos/${pontoId}`, {
         method: 'DELETE',
      });

      if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData.messages?.join(', ') || 'Erro ao excluir ponto turístico');
      }

      // Atualiza a lista de pontos após a exclusão
      alert('Ponto turístico excluído com sucesso!');
      await recuperarDados();

   } catch (error) {
      console.error('Erro ao excluir ponto turístico:', error);
      alert('Erro ao excluir ponto turístico: ' + error.message);
   }
}


// ==================== Funções auxiliares ====================

// Scroll para a section de busca
function scrollToSearch() {
   document.getElementById('search').scrollIntoView({ behavior: 'smooth' });
}

function openModal(modalId) {
   document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
   document.getElementById(modalId).style.display = 'none';
}

// Função para limpar os campos
function clearFields() {
   document.getElementById('pontoForm').reset();
   document.getElementById('pontoCity').innerHTML = '<option value="">Selecione uma cidade</option>';
}

// Fechar modal quando clicar fora dele
window.onclick = function (event) {
   if (event.target.classList.contains('modal')) {
      event.target.style.display = 'none';
   }
}


// ==================== Funções para buscar cidade na api do IBGE ===================
const estados = [
   { sigla: 'AC', nome: 'Acre' },
   { sigla: 'AL', nome: 'Alagoas' },
   { sigla: 'AP', nome: 'Amapá' },
   { sigla: 'AM', nome: 'Amazonas' },
   { sigla: 'BA', nome: 'Bahia' },
   { sigla: 'CE', nome: 'Ceará' },
   { sigla: 'DF', nome: 'Distrito Federal' },
   { sigla: 'ES', nome: 'Espírito Santo' },
   { sigla: 'GO', nome: 'Goiás' },
   { sigla: 'MA', nome: 'Maranhão' },
   { sigla: 'MT', nome: 'Mato Grosso' },
   { sigla: 'MS', nome: 'Mato Grosso do Sul' },
   { sigla: 'MG', nome: 'Minas Gerais' },
   { sigla: 'PA', nome: 'Pará' },
   { sigla: 'PB', nome: 'Paraíba' },
   { sigla: 'PR', nome: 'Paraná' },
   { sigla: 'PE', nome: 'Pernambuco' },
   { sigla: 'PI', nome: 'Piauí' },
   { sigla: 'RJ', nome: 'Rio de Janeiro' },
   { sigla: 'RN', nome: 'Rio Grande do Norte' },
   { sigla: 'RS', nome: 'Rio Grande do Sul' },
   { sigla: 'RO', nome: 'Rondônia' },
   { sigla: 'RR', nome: 'Roraima' },
   { sigla: 'SC', nome: 'Santa Catarina' },
   { sigla: 'SP', nome: 'São Paulo' },
   { sigla: 'SE', nome: 'Sergipe' },
   { sigla: 'TO', nome: 'Tocantins' }
];

// Função para carregar os estados
function loadStates() {
   const stateSelect = document.getElementById('pontoState');

   // Limpa as opções existentes
   stateSelect.innerHTML = '<option value="">Selecione um estado</option>';

   // Adiciona os estados
   estados.forEach(estado => {
      const option = document.createElement('option');
      option.value = estado.sigla;
      option.textContent = estado.nome;
      stateSelect.appendChild(option);
   });
}

// Função para carregar as cidades baseado no estado selecionado
async function loadCities() {
   const stateSelect = document.getElementById('pontoState');
   const citySelect = document.getElementById('pontoCity');
   const selectedState = stateSelect.value;

   // Limpa as cidades
   citySelect.innerHTML = '<option value="">Selecione uma cidade</option>';

   if (selectedState) {
      try {
         const response = await fetch(`http://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`);
         const cities = await response.json();

         cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city.nome;
            option.textContent = city.nome;
            citySelect.appendChild(option);
         });
      } catch (error) {
         console.error('Erro ao carregar cidades:', error);
         alert('Erro ao carregar as cidades. Por favor, tente novamente.');
      }
   }
}