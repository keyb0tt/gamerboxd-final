
// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function () {
    // Carrega os dados salvos quando a página abre
    carregarDadosSalvos();

    // Adiciona o evento de submit ao formulário
    document.querySelector(".meuFormulario").addEventListener("submit", function (event) {
        event.preventDefault();
        salvarDadosLogin();
    });
});

// Função para salvar os dados de login
function salvarDadosLogin() {
    // Pega os valores dos campos
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const remember = document.getElementById("remember").checked;

    // Valida se os campos estão preenchidos
    if (!email || !password) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // Cria o objeto com os dados
    const dadosLogin = {
        email: email,
        password: password, // ATENÇÃO: Isso não é seguro para aplicações reais
        remember: remember,
        timestamp: new Date().toISOString()
    };

    // Decide onde armazenar (localStorage ou sessionStorage)
    const storage = remember ? localStorage : sessionStorage;

    // Pega os logins existentes ou cria um array vazio
    let historicoLogins = JSON.parse(storage.getItem("historicoLogins") || "[]");
    // historicoLogins = JSON.parse(historicoLogins); // Converte a string para array

    // Adiciona o novo login ao histórico
    historicoLogins.push(dadosLogin);

    // Salva de volta no storage
    storage.setItem("historicoLogins", JSON.stringify(historicoLogins));

    // Feedback para o usuário
    console.log("Login salvo:", dadosLogin);

    // Limpa o formulário
    document.querySelector(".meuFormulario").reset();
}

// Função para carregar os dados salvos
function carregarDadosSalvos() {
    // Tenta carregar do localStorage primeiro (logins lembrados)
    let historicoLogins = JSON.parse(localStorage.getItem("historicoLogins") || "[]");
    // historicoLogins = JSON.parse(historicoLogins);

    if (historicoLogins.length > 0) {
        // Pega o último login
        const ultimoLogin = historicoLogins[historicoLogins.length - 1];

        // Preenche os campos
        document.getElementById("email").value = ultimoLogin.email;
        document.getElementById("password").value = ultimoLogin.password;
        document.getElementById("remember").checked = true;
    }
}

// Função para limpar o histórico
function limparHistoricoLogin() {
    if (confirm("Tem certeza que deseja limpar todo o histórico de logins?")) {
        localStorage.removeItem("historicoLogins");
        sessionStorage.removeItem("historicoLogins");
        alert("Histórico de logins limpo com sucesso!");
        document.querySelector(".meuFormulario").reset();
    }
}
