document.querySelector(".meuFormulario").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const remember = document.getElementById("remember").checked;

    const dadosLogin = {
        email: email,
        password: password,
        remember: remember
    };

    console.log("Dados do Login:", dadosLogin);

    this.reset();
});

document.querySelector(".meuFormulario").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        console.error("Preencha todos os campos obrigatórios!");
        return;
    }

    console.log("Dados válidos:", { email, password });
});