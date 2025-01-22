// Variáveis globais para paginação
let currentPage = 1;
const itemsPerPage = 6;
let allTrips = [];

// Função para recuperar dados com paginação
async function recuperarDados() {
   try {
      const response = await fetch('https://localhost:7076/api/Pontos');
      const data = await response.json();

      console.log(data.pontos);
      const spotsGrid = document.getElementById('spotsGrid');
      const noResults = document.getElementById('noResults');

      // Limpa ambos os elementos antes de qualquer exibição
      spotsGrid.innerHTML = '';
      noResults.style.display = 'none';

      if (data.pontos && data.pontos.length > 0) {
         allTrips = data.pontos; // Armazena todos os resultados
         displayCurrentPage(); // Exibe a página atual
         updatePaginationControls(); // Atualiza os controles de paginação
      } else {
         allTrips = [];
         document.getElementById('pagination').innerHTML = '';
         noResults.style.display = 'block';
      }
   } catch (error) {
      console.error('Erro:', error);
      document.getElementById('pagination').innerHTML = '';
      noResults.style.display = 'block';
   }
}

// Função para exibir a página atual
function displayCurrentPage() {
   const spotsGrid = document.getElementById('spotsGrid');
   const noResults = document.getElementById('noResults');

   spotsGrid.innerHTML = '';
   noResults.style.display = 'none';

   const startIndex = (currentPage - 1) * itemsPerPage;
   const endIndex = startIndex + itemsPerPage;
   const currentPageTrips = allTrips.slice(startIndex, endIndex);

   if (currentPageTrips.length > 0) {
      currentPageTrips.forEach(trip => {
         const tripElement = document.createElement('div');
         tripElement.classList.add('spot-card');

         tripElement.innerHTML = `
            <div class='spotimage'>
               <img src="https://placehold.co/300x200.png" alt="Imagem da Viagem" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="spot-content">
               <h3>${pontos.name}</h3>
               <p><strong>Descrição: </strong>${pontos.description}</p>
               <p><strong>Localização: </strong>${pontos.location}</p>
               <p><strong>Cidade: </strong>${pontos.city}</p>
               <p><strong>Estado: </strong>${pontos.state}</p>
               <button class="btn btn-primary" onclick="viewDetails('${pontos.id}')">Ver Detalhes</button>
            </div>
         `;

         spotsGrid.appendChild(tripElement);
      });
   } else {
      noResults.style.display = 'block';
      document.getElementById('pagination').innerHTML = '';
   }
}

// Função para atualizar os controles de paginação
function updatePaginationControls() {
   const totalPages = Math.ceil(allTrips.length / itemsPerPage);
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

// Função para mudar de página
function changePage(newPage) {
   const totalPages = Math.ceil(allTrips.length / itemsPerPage);

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

// Modificar a função searchSpots para incluir paginação
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

      const response = await fetch(`https://localhost:7076/api/Pontos/${encodeURIComponent(name)}/search`);

      if (!response.ok) {
         if (response.status === 404) {
            allTrips = [];
            noResults.style.display = 'block';
            return;
         }
         throw new Error(`Erro na API: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.trips && data.trips.length > 0) {
         allTrips = data.trips;
         currentPage = 1;
         displayCurrentPage();
         updatePaginationControls();
      } else {
         allTrips = [];
         noResults.style.display = 'block';
      }
   } catch (error) {
      console.error('Erro ao buscar pontos turísticos:', error);
      allTrips = [];
      noResults.style.display = 'block';
      alert('Ocorreu um erro ao buscar os dados. Por favor, tente novamente.');
   }
}

// Scroll to search section
function scrollToSearch() {
   document.getElementById('search').scrollIntoView({ behavior: 'smooth' });
}

// Modal functions
function openModal(modalId) {
   document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
   document.getElementById(modalId).style.display = 'none';
}

// Fechar modal quando clicar fora dele
window.onclick = function (event) {
   if (event.target.classList.contains('modal')) {
      event.target.style.display = 'none';
   }
}

// Função para visualizar detalhes da viagem
async function viewDetails(pontoId) {
   try {
      const response = await fetch(`https://localhost:7076/api/Pontos/${pontoId}`);

      if (!response.ok) {
         throw new Error('Erro ao buscar detalhes da viagem');
      }

      const trip = await response.json();

      // Formatar as datas
      const startDate = new Date(trip.startDate);
      const endDate = new Date(trip.endDate);
      const today = new Date();

      // Calcular duração em dias
      const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

      // Determinar status da viagem
      let status;
      if (today < startDate) {
         status = { text: 'Próxima', class: 'status-upcoming' };
      } else if (today > endDate) {
         status = { text: 'Concluída', class: 'status-completed' };
      } else {
         status = { text: 'Em Andamento', class: 'status-active' };
      }

      // Preencher os detalhes no modal
      document.getElementById('detailName').textContent = trip.name;
      document.getElementById('detailStartDate').textContent = startDate.toLocaleDateString('pt-BR');
      document.getElementById('detailEndDate').textContent = endDate.toLocaleDateString('pt-BR');
      document.getElementById('detailDuration').textContent = `${duration} dias`;

      const statusElement = document.getElementById('detailStatus');
      statusElement.textContent = status.text;
      statusElement.className = status.class;

      // Abrir o modal
      openModal('detailsModal');

   } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao carregar detalhes da viagem');
   }
}

// Função para registrar uma nova viagem
async function registerTrip(event) {
   event.preventDefault();

   const tripData = {
      name: document.getElementById('tripName').value,
      startDate: new Date(document.getElementById('tripStartDate').value).toISOString(),
      endDate: new Date(document.getElementById('tripEndDate').value).toISOString()
   };

   try {
      const response = await fetch('https://localhost:7098/api/Trips', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(tripData)
      });

      if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData.messages?.join(', ') || 'Erro ao registrar viagem');
      }

      const novaViagem = await response.json();

      // Fecha o modal
      closeModal('registerModal');

      // Limpa o formulário
      document.getElementById('tripForm').reset();

      // Atualiza a lista de viagens
      await recuperarDados();

      // Opcional: Mostra mensagem de sucesso
      alert('Viagem registrada com sucesso!');

   } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao registrar viagem: ' + error.message);
   }
}

function clearFields() {

   document.getElementById('tripForm').reset();

}