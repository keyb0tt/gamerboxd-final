
document.addEventListener('DOMContentLoaded', function () {
    carregarDadosSalvos();


    document.querySelector(".meuFormulario").addEventListener("submit", function (event) {
        event.preventDefault();
        salvarDadosLogin();
    });
});

function salvarDadosLogin() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const remember = document.getElementById("remember").checked;

    if (!email || !password) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const dadosLogin = {
        email: email,
        password: password,
        remember: remember,
        timestamp: new Date().toISOString()
    };

    const storage = remember ? localStorage : sessionStorage;

    let historicoLogins = JSON.parse(storage.getItem("historicoLogins") || "[]");
    historicoLogins.push(dadosLogin);

    storage.setItem("historicoLogins", JSON.stringify(historicoLogins));


    console.log("Login salvo:", dadosLogin);


    document.querySelector(".meuFormulario").reset();
}

function carregarDadosSalvos() {

    let historicoLogins = JSON.parse(localStorage.getItem("historicoLogins") || "[]");

    if (historicoLogins.length > 0) {

        const ultimoLogin = historicoLogins[historicoLogins.length - 1];

        document.getElementById("email").value = ultimoLogin.email;
        document.getElementById("password").value = ultimoLogin.password;
        document.getElementById("remember").checked = true;
    }
}

function limparHistoricoLogin() {
    if (confirm("Tem certeza que deseja limpar todo o histórico de logins?")) {
        localStorage.removeItem("historicoLogins");
        sessionStorage.removeItem("historicoLogins");
        alert("Histórico de logins limpo com sucesso!");
        document.querySelector(".meuFormulario").reset();
    }
}
