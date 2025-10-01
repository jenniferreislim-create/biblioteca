/* Conteúdo do arquivo arquivo.js */

function mouseOver() {
  document.getElementById("livros").src = "book.gif";
}

function mouseOut() {
  document.getElementById("livros").src = "livros.gif";
}

// =========================================================
// FUNÇÕES JAVASCRIPT PARA INTEGRAÇÃO COM A API DO GOOGLE LIVROS
// =========================================================

/**
 * Função principal que realiza a busca na API do Google Livros
 * e exibe os resultados no elemento com id="resultado".
 * * @param {string} termoBusca - O termo digitado pelo usuário (Título, Autor, ISBN).
 */
function buscarLivrosGoogle(termoBusca) {
    // Usa 'resultado' como o ID do container onde os resultados serão exibidos
    const resultadosDiv = document.getElementById('resultado');
    
    // 1. Validação
    if (!termoBusca || termoBusca.trim() === "") {
        resultadosDiv.innerHTML = "<p style='color: #dc3545; font-weight: bold;'>⚠️ Por favor, digite um termo de busca válido.</p>";
        return;
    }

    // Exibe mensagem de busca
    resultadosDiv.innerHTML = "<p>⏳ Buscando no Acervo Online (Google Livros)...</p>";

    // API do Google Livros (URL)
    const url=https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(termoBusca)}&maxResults=10;

    // 2. Realiza a requisição Fetch
    fetch(url)
        .then(response => {
            if (!response.ok) {
                // Lança um erro se a resposta HTTP não for 200 OK
                throw new Error('Erro na rede ou na API: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            // 3. Processa e exibe os resultados
            if (data.items && data.items.length > 0) {
                let htmlResultado = '<h3 style="margin-bottom: 15px;">Livros Encontrados (' + data.items.length + '):</h3>';
                
                data.items.forEach(item => {
                    const info = item.volumeInfo;
                    const titulo = info.title || "Título Indisponível";
                    const autores = info.authors ? info.authors.join(', ') : "Autor Desconhecido";
                    const link = info.infoLink || "#";
                    
                    // Obtém a URL da capa (usa smallThumbnail como prioridade)
                    const capa = info.imageLinks ? (info.imageLinks.smallThumbnail || info.imageLinks.thumbnail) : 'https://via.placeholder.com/80x120?text=Sem+Capa';
                    
                    // Obtém a descrição (limita o tamanho)
                    const descricao = info.description ? info.description.substring(0, 150) + '...' : 'Sem descrição disponível.';
                    
                    // Constrói o HTML para cada livro
                    htmlResultado += `
                        <div style="display: flex; margin-bottom: 20px; padding: 10px; border: 1px solid #eee; border-radius: 5px; background-color: #fff;">
                            <img src="${capa}" alt="Capa do livro" style="width: 80px; height: 120px; margin-right: 15px; object-fit: cover; flex-shrink: 0;">
                            <div>
                                <h4 style="margin-top: 0;"><a href="${link}" target="_blank" style="color: #007bff; text-decoration: none;">${titulo}</a></h4>
                                <p style="font-size: 0.9em; margin: 5px 0;">Autor(es): <strong>${autores}</strong></p>
                                <p style="font-size: 0.8em; color: #555;">${descricao}</p>
                            </div>
                        </div>
                    `;
                });
                
                resultadosDiv.innerHTML = htmlResultado;
            } else {
                resultadosDiv.innerHTML = "<p style='color: #888;'>Nenhum livro encontrado para o termo pesquisado. Tente termos diferentes.</p>";
            }
        })
        .catch(error => {
            // 4. Trata erros na requisição
            console.error('Erro ao buscar a API do Google Livros:', error);
            resultadosDiv.innerHTML = "<p style='color: #dc3545;'>❌ Ocorreu um erro ao conectar com o acervo. Detalhes: " + error.message + "</p>";
        });
}

// =========================================================
// OUTRAS FUNÇÕES (Se houverem)
// =========================================================

// Exemplo de função para animação do GIF (baseada no seu HTML anterior)
function mouseOver() {
    document.images.imagem.src = "livros.gif";
}

function mouseOut() {
    document.images.imagem.src = "livros.gif"; // Assumindo que o estado "out" volta para o GIF ou outra imagem estática
}

// *Observação:* Funções como validaCampo() e validarFormulario() mencionadas no seu HTML
// devem ser implementadas neste arquivo.js para que o código HTML funcione corretamente.
// Este é um modelo de como a função deve ser no seu arquivo.js

function buscarLivrosGoogle() {
    const termoBusca = document.getElementById('campoBuscaGoogle').value;
    const resultadosDiv = document.getElementById('resultadosBusca');
    
    if (termoBusca.trim() === "") {
        resultadosDiv.innerHTML = "<p>Por favor, digite um termo de busca válido.</p>";
        return;
    }

    resultadosDiv.innerHTML = "<p>Buscando no Google Livros...</p>";

    // API do Google Livros
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(termoBusca)}&maxResults=10`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.items) {
                let htmlResultado = '<h3>Livros Encontrados:</h3><ul>';
                
                data.items.forEach(item => {
                    const info = item.volumeInfo;
                    const titulo = info.title || "Título Indisponível";
                    const autores = info.authors ? info.authors.join(', ') : "Autor Desconhecido";
                    const link = info.infoLink || "#";
                    
                    htmlResultado += `<li><a href="${link}" target="_blank"><strong>${titulo}</strong></a> por ${autores}</li>`;
                });
                
                htmlResultado += '</ul>';
                resultadosDiv.innerHTML = htmlResultado;
            } else {
                resultadosDiv.innerHTML = "<p>Nenhum livro encontrado para o termo.</p>";
            }
        })
        .catch(error => {
            console.error('Erro ao buscar a API do Google Livros:', error);
            resultadosDiv.innerHTML = "<p>Ocorreu um erro na busca. Tente novamente mais tarde.</p>";
        });
}

// Se você precisar de alguma ação ao clicar no ícone lateral, adicione aqui.
document.addEventListener('DOMContentLoaded', () => {
    const linkAcervo = document.getElementById('link-acervo-online');
    if (linkAcervo) {
        linkAcervo.addEventListener('click', (e) => {
            // Rola a página até a seção de busca
            document.getElementById('busca-acervo-online').scrollIntoView({ behavior: 'smooth' });
        });
    }
});

function fazerLogin() {
  // Aqui vai sua lógica de login
  alert("Login acionado!");
  // Exemplo: abrir modal, redirecionar, validar formulário etc.
}

// Seleciona todos os elementos com a classe .btn-login
const botoesLogin = document.querySelectorAll(".btn-login");

// Adiciona evento de clique em cada um
botoesLogin.forEach(botao => {
  botao.addEventListener("click", function(event) {
    event.preventDefault(); // impede que links recarreguem a página
    fazerLogin();
  });




/* --- Funções já existentes --- */
function mouseOver() {
  document.getElementById("livros").src = "book.gif";
}
function mouseOut() {
  document.getElementById("livros").src = "livros.gif";
}

/* --- Validação Login --- */
function validar() {
  const nome = document.getElementById("nome");

  if (nome.value.trim() === "") {
    alert("Por favor, preencha o campo Nome!");
    nome.focus();
    return false; // impede o envio
  }

  return true; // permite o envio
}

/* --- Validação Reserva --- */
function validarReserva() {
  const nomeReserva = document.getElementById("nomeReserva");
  const livro = document.getElementById("livro");
  const dataReserva = document.getElementById("dataReserva");

  if (nomeReserva.value.trim() === "") {
    alert("Por favor, preencha o campo Nome!");
    nomeReserva.focus();
    return false;
  }

  if (livro.value.trim() === "") {
    alert("Por favor, preencha o campo Título do Livro!");
    livro.focus();
    return false;
  }

  if (dataReserva.value === "") {
    alert("Por favor, selecione a Data da Reserva!");
    dataReserva.focus();
    return false;
  }

  return true;
}
});
