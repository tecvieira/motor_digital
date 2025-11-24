let cardContainer = document.querySelector(".card-container");
let dados = [];

// Adiciona a seleção do input e do botão de busca
let searchInput = document.querySelector("#searchInput");
let searchButton = document.querySelector("#searchButton");

async function carregarDados() {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    renderizarCards(dados);
}

function realizarBusca() {
    const termoBusca = searchInput.value.toLowerCase();
    const resultados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descricao.toLowerCase().includes(termoBusca)
    );
    renderizarCards(resultados);
}

function renderizarCards(dados) {
    // Limpa o container antes de renderizar os novos cards
    cardContainer.innerHTML = "";

    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p>${dado.ano}</p>
        <p>${dado.descricao}</p>
        <a href="${dado.link}" target="_blank">Saiba mais</a>
        `
        cardContainer.appendChild(article);
    }
}

// Adiciona o evento de clique no botão de busca
searchButton.addEventListener("click", realizarBusca);

// Carrega os dados iniciais ao carregar a página
carregarDados();
