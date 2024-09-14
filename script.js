document.addEventListener('DOMContentLoaded', () => {
    const CARGO_STORAGE_KEY = 'cargos';
    const DEPARTAMENTO_STORAGE_KEY = 'departamentos';
    const COLABORADOR_STORAGE_KEY = 'colaboradores';

    const cargoForm = document.getElementById('cargoForm');
    const cargoList = document.getElementById('cargoList');
    const cargoSelect = document.getElementById('cargoSelect');

    const departamentoForm = document.getElementById('departamentoForm');
    const departamentoList = document.getElementById('departamentoList');
    const departamentoSelect = document.getElementById('departamentoSelect');

    const colaboradorForm = document.getElementById('colaboradorForm');
    const colaboradorList = document.getElementById('colaboradorList');
    let editIndex = -1;

    // Função para gerenciar o localStorage (genérica)
    function getLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    function setLocalStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    // Função para evitar duplicações (genérica)
    function isDuplicate(data, name) {
        return data.some(item => item.nome === name);
    }

    // Função genérica para renderizar listas
    function renderList(data, listElement, deleteCallback) {
        listElement.innerHTML = '';
        data.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item.nome;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.addEventListener('click', () => deleteCallback(index));

            li.appendChild(deleteButton);
            listElement.appendChild(li);
        });
    }

    // Função para atualizar select
    function updateSelect(data, selectElement, placeholder) {
        selectElement.innerHTML = `<option value="">${placeholder}</option>`;
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = item.nome;
            option.textContent = item.nome;
            selectElement.appendChild(option);
        });
    }

    // Funções para manipular Cargos
    function loadCargos() {
        const cargos = getLocalStorage(CARGO_STORAGE_KEY);
        renderList(cargos, cargoList, deleteCargo);
        updateSelect(cargos, cargoSelect, 'Selecione um cargo');
    }

    function addCargo(nome) {
        const cargos = getLocalStorage(CARGO_STORAGE_KEY);
        if (!isDuplicate(cargos, nome)) {
            cargos.push({ nome });
            setLocalStorage(CARGO_STORAGE_KEY, cargos);
            loadCargos();
        } else {
            alert('Cargo já existe!');
        }
    }

    function deleteCargo(index) {
        const cargos = getLocalStorage(CARGO_STORAGE_KEY);
        cargos.splice(index, 1);
        setLocalStorage(CARGO_STORAGE_KEY, cargos);
        loadCargos();
    }

    // Funções para manipular Departamentos
    function loadDepartamentos() {
        const departamentos = getLocalStorage(DEPARTAMENTO_STORAGE_KEY);
        renderList(departamentos, departamentoList, deleteDepartamento);
        updateSelect(departamentos, departamentoSelect, 'Selecione um departamento');
    }

    function addDepartamento(nome) {
        const departamentos = getLocalStorage(DEPARTAMENTO_STORAGE_KEY);
        if (!isDuplicate(departamentos, nome)) {
            departamentos.push({ nome });
            setLocalStorage(DEPARTAMENTO_STORAGE_KEY, departamentos);
            loadDepartamentos();
        } else {
            alert('Departamento já existe!');
        }
    }

    function deleteDepartamento(index) {
        const departamentos = getLocalStorage(DEPARTAMENTO_STORAGE_KEY);
        departamentos.splice(index, 1);
        setLocalStorage(DEPARTAMENTO_STORAGE_KEY, departamentos);
        loadDepartamentos();
    }

    // Funções para manipular Colaboradores
    function loadColaboradores() {
        const colaboradores = getLocalStorage(COLABORADOR_STORAGE_KEY);
        colaboradorList.innerHTML = '';
        colaboradores.forEach((colaborador, index) => {
            const li = document.createElement('li');
            li.textContent = `ID: ${colaborador.id}, Nome: ${colaborador.nome}, Cargo: ${colaborador.cargo}, Departamento: ${colaborador.departamento}`;

            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.addEventListener('click', () => editColaborador(index));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.addEventListener('click', () => deleteColaborador(index));

            li.appendChild(editButton);
            li.appendChild(deleteButton);
            colaboradorList.appendChild(li);
        });
    }

    function editColaborador(index) {
        const colaboradores = getLocalStorage(COLABORADOR_STORAGE_KEY);
        const colaborador = colaboradores[index];

        document.getElementById('id').value = colaborador.id;
        document.getElementById('nome').value = colaborador.nome;
        document.getElementById('cargoSelect').value = colaborador.cargo;
        document.getElementById('departamentoSelect').value = colaborador.departamento;

        editIndex = index;
        document.querySelector('button[type="submit"]').textContent = 'Atualizar';
    }

    function deleteColaborador(index) {
        const colaboradores = getLocalStorage(COLABORADOR_STORAGE_KEY);
        colaboradores.splice(index, 1);
        setLocalStorage(COLABORADOR_STORAGE_KEY, colaboradores);
        loadColaboradores();
    }

    // Configurações de eventos para formulários
    cargoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const cargoNome = document.getElementById('cargoNome').value;
        addCargo(cargoNome);
        cargoForm.reset();
    });

    departamentoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const departamentoNome = document.getElementById('departamentoNome').value;
        addDepartamento(departamentoNome);
        departamentoForm.reset();
    });

    colaboradorForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const id = document.getElementById('id').value;
        const nome = document.getElementById('nome').value;
        const cargo = document.getElementById('cargoSelect').value;
        const departamento = document.getElementById('departamentoSelect').value;

        const colaboradores = getLocalStorage(COLABORADOR_STORAGE_KEY);
        
        if (editIndex >= 0) {
            colaboradores[editIndex] = { id, nome, cargo, departamento };
            editIndex = -1;
            document.querySelector('button[type="submit"]').textContent = 'Salvar';
        } else {
            colaboradores.push({ id, nome, cargo, departamento });
        }

        setLocalStorage(COLABORADOR_STORAGE_KEY, colaboradores);
        colaboradorForm.reset();
        loadColaboradores();
    });

    // Inicialização
    function initializeForms() {
        document.getElementById('id').value = '';
        document.getElementById('nome').value = '';
        document.getElementById('cargoSelect').value = '';
        document.getElementById('departamentoSelect').value = '';
        document.querySelector('button[type="submit"]').textContent = 'Salvar';
    }

    // Carregar dados e inicializar formulários
    loadCargos();
    loadDepartamentos();
    loadColaboradores();
    initializeForms();
});
