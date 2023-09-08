const cadastro = document.getElementById("cadastro")
function openModal() {
    document.getElementById("seCadastre").style.display = "block";
}

function closeModal() {
    document.getElementById("seCadastre").style.display = "none";
}

window.onclick = function (event) {
    if (event.target == document.getElementById("seCadastre")) {
        closeModal();
    }
}

let edicaoAtiva = false;
let registroEditando = null;

function carregarRegistros() {
    const registros = JSON.parse(localStorage.getItem('registros')) || [];

    registros.forEach(registro => {
        const registroRow = criarRegistroRow(registro);
        document.getElementById('registros').appendChild(registroRow);
    });
}

function criarRegistroRow(registro) {
    const registroRow = document.createElement('tr');

    const nomeCell = document.createElement('td');
    nomeCell.textContent = registro.nome;

    const idadeCell = document.createElement('td');
    idadeCell.textContent = registro.idade;

    const racaCell = document.createElement('td');
    racaCell.textContent = registro.raca;

    const sexoCell = document.createElement('td');
    sexoCell.textContent = registro.sexo;

    const acoesCell = document.createElement('td');

    const editarBtn = document.createElement('button');
    editarBtn.className = 'editar-btn';
    editarBtn.textContent = 'Editar';
    editarBtn.addEventListener('click', () => editarCadastro(registro));
    acoesCell.appendChild(editarBtn);

    const excluirBtn = document.createElement('button');
    excluirBtn.className = 'excluir-btn';
    excluirBtn.textContent = 'Excluir';
    excluirBtn.addEventListener('click', () => excluirCadastro(registro));
    acoesCell.appendChild(excluirBtn);

    registroRow.appendChild(nomeCell);
    registroRow.appendChild(idadeCell);
    registroRow.appendChild(racaCell);
    registroRow.appendChild(sexoCell);
    registroRow.appendChild(acoesCell);

    return registroRow;
}

function editarCadastro(registro) {
    document.getElementById('nomeEdit').value = registro.nome;
    document.getElementById('idadeEdit').value = registro.idade;
    document.getElementById('racaEdit').value = registro.raca;
    document.getElementById('sexoEdit').value = registro.sexo;

    document.getElementById('editarModal').style.display = 'block';

    edicaoAtiva = true;
    registroEditando = registro;
}

function salvarEdicao() {
    const nome = document.getElementById('nomeEdit').value;
    const idade = document.getElementById('idadeEdit').value;
    const raca = document.getElementById('racaEdit').value;
    const sexo = document.getElementById('sexoEdit').value;

    if (nome && idade && raca && sexo) {

        registroEditando.nome = nome;
        registroEditando.idade = idade;
        registroEditando.raca = raca;
        registroEditando.sexo = sexo;

        const registros = JSON.parse(localStorage.getItem('registros')) || [];
        localStorage.setItem('registros', JSON.stringify(registros));

        fecharModal();


        atualizarListaRegistros();

        edicaoAtiva = false;
        registroEditando = null;
    } else {
        alert('Preencha todos os campos do formulário de edição.');
    }
}

function fecharModal() {
    document.getElementById('editarModal').style.display = 'none';
}

function excluirCadastro(registro) {
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    const index = registros.findIndex(r => r.nome === registro.nome && r.idade === registro.idade && r.raca === registro.raca && r.sexo === registro.sexo);

    if (index !== -1) {
        registros.splice(index, 1);
        localStorage.setItem('registros', JSON.stringify(registros));
        atualizarListaRegistros();
    }
}

function atualizarListaRegistros() {
    const registrosTable = document.getElementById('registros');
    registrosTable.innerHTML = '';

    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    registros.forEach(registro => {
        const registroRow = criarRegistroRow(registro);
        registrosTable.appendChild(registroRow);
    });
}

function adicionarCadastro() {
    if (edicaoAtiva) {
        alert('Termine a edição antes de adicionar um novo registro.');
        return;
    }

    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const raca = document.getElementById('raca').value;
    const sexo = document.getElementById('sexo').value;

    if (nome && idade && raca && sexo) {
        const registro = {
            nome: nome,
            idade: idade,
            raca: raca,
            sexo: sexo
        };

        const registros = JSON.parse(localStorage.getItem('registros')) || [];
        registros.push(registro);
        localStorage.setItem('registros', JSON.stringify(registros));
        atualizarListaRegistros();


        document.getElementById('cadastroForm').reset();
    } else {
        alert('Preencha todos os campos do formulário de adição.');
    }
}

carregarRegistros();