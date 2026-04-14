// FINÇÃO PARA MOSTRAR A TABELA
function listar(){
    const elements = document.querySelector(".elementos");
    elements.classList.toggle("apareca");
};

// FUNÇÃO PARA SALVAR OS DADOS NO LOCALSTORAGE
function enviar(){
    const nome = document.getElementById("name").value.trim();
    const number = document.getElementById("number").value.trim();
    const email = document.getElementById("email").value.trim();

    // ANALISA SE OS CAMPOS TODOS ESTÃO PREENCHIDOS
    if(!nome || !number || !email){
        return alert("Preencha todos os campos");
    };

    const userData = { nome, number, email };
    let usersData = JSON.parse(localStorage.getItem("usersData")) || [];
    usersData.push(userData);

    // SALVA NO LOCALSTORAGE
    localStorage.setItem("usersData", JSON.stringify(usersData));

    // ACTUALIZA A PÁGINA APÓS ENVIAR OS DADOS
    location.reload();
};

//FUNÇÃO PARA IR PEGAR OS DADOS SALVOS NO LOCALSTORAGE
window.addEventListener("DOMContentLoaded", function () {
    const usersData = JSON.parse(localStorage.getItem("usersData")) || [];
    usersData.forEach((userData, index) => adicionarLinha(userData, index));
});

// FUNÇÃO PARA ADICIONAR A LINHA NA TABELA APÓS ACTUALIZAR A PÁGINA
function adicionarLinha(userData, index){
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${userData.nome}</td>
    <td>${userData.number}</td>
    <td>${userData.email}</td>
    <td>
        <button onclick="editar(index)" style="background: #3498db;">Editar</button>    
        <button class="delete-btn" data-index="${index}" style="background: red;">Eliminar</button>
    </td>`;
    document.getElementById("corpo").appendChild(tr);

    // EVENTO DE ELIMINAR
    tr.querySelector(".delete-btn").addEventListener("click", function () {
        eliminarCadastro(this.dataset.index);
        tr.remove();

        const div = document.createElement("div");
        div.id="popUp";
        div.innerHTML = `
            <h2>✅  Item Eliminado com Sucesso</h2>
        `;
        document.querySelector("main").appendChild(div);

        setTimeout(() => div.style.display="none", 2000);
    });
}

// FUNÇÃO PARA APAGAR O CADASTRO(APENAS OS DADOS DE UM USER) DO LOCALSTORAGE
function eliminarCadastro(index) {
    let usersData = JSON.parse(localStorage.getItem("usersData")) || [];

    usersData.splice(index, 1); // Remove 1 item

    localStorage.setItem("usersData", JSON.stringify(usersData));
};
