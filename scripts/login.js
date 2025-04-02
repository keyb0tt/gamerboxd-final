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

    if (!email || !password) {
        console.error("Preencha todos os campos obrigatórios!");
        return;
    }

    else if (remember) {
        localStorage.setItem("dadosLogin", JSON.stringify(dadosLogin));
    }

    console.log("Dados do Login:", dadosLogin);

    this.reset();
});

