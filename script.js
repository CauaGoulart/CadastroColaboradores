document.addEventListener('DOMContentLoaded', () => {
    const cargoForm = document.getElementById('cargoForm');
    const cargoList = document.getElementById('cargoList');
    const cargoSelect = document.getElementById('cargoSelect');
    
    const departamentoForm = document.getElementById('departamentoForm');
    const departamentoList = document.getElementById('departamentoList');
    const departamentoSelect = document.getElementById('departamentoSelect');
    
    const colaboradorForm = document.getElementById('colaboradorForm');
    const colaboradorList = document.getElementById('colaboradorList');
    let editIndex = -1; // Index para rastrear o item que está sendo editado

    // Função para carregar e exibir a lista de cargos
    function loadCargos() {
        const cargos = JSON.parse(localStorage.getItem('cargos')) || [];
        cargoList.innerHTML = '';
        cargoSelect.innerHTML = '<option value="">Selecione um cargo</option>'; // Resetar as opções do select
        
        cargos.forEach((cargo, index) => {
            const li = document.createElement('li');
            li.textContent = cargo.nome;
            
            // Botão de Excluir
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.addEventListener('click', () => deleteCargo(index));
            
            li.appendChild(deleteButton);
            cargoList.appendChild(li);
            
            // Adicionar opção ao select de cargos
            const option = document.createElement('option');
            option.value = cargo.nome;
            option.textContent = cargo.nome;
            cargoSelect.appendChild(option);
        });
    }

    // Função para adicionar um novo cargo
    function addCargo(nome) {
        const cargos = JSON.parse(localStorage.getItem('cargos')) || [];
        cargos.push({ nome });
        localStorage.setItem('cargos', JSON.stringify(cargos));
        loadCargos();
    }

    // Função para excluir um cargo
    function deleteCargo(index) {
        let cargos = JSON.parse(localStorage.getItem('cargos')) || [];
        cargos.splice(index, 1);
        localStorage.setItem('cargos', JSON.stringify(cargos));
        loadCargos();
    }

    // Função para carregar e exibir a lista de departamentos
    function loadDepartamentos() {
        const departamentos = JSON.parse(localStorage.getItem('departamentos')) || [];
        departamentoList.innerHTML = '';
        departamentoSelect.innerHTML = '<option value="">Selecione um departamento</option>'; // Resetar as opções do select
        
        departamentos.forEach((departamento, index) => {
            const li = document.createElement('li');
            li.textContent = departamento.nome;
            
            // Botão de Excluir
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.addEventListener('click', () => deleteDepartamento(index));
            
            li.appendChild(deleteButton);
            departamentoList.appendChild(li);
            
            // Adicionar opção ao select de departamentos
            const option = document.createElement('option');
            option.value = departamento.nome;
            option.textContent = departamento.nome;
            departamentoSelect.appendChild(option);
        });
    }

    // Função para adicionar um novo departamento
    function addDepartamento(nome) {
        const departamentos = JSON.parse(localStorage.getItem('departamentos')) || [];
        departamentos.push({ nome });
        localStorage.setItem('departamentos', JSON.stringify(departamentos));
        loadDepartamentos();
    }

    // Função para excluir um departamento
    function deleteDepartamento(index) {
        let departamentos = JSON.parse(localStorage.getItem('departamentos')) || [];
        departamentos.splice(index, 1);
        localStorage.setItem('departamentos', JSON.stringify(departamentos));
        loadDepartamentos();
    }

    // Função para carregar e exibir a lista de colaboradores
    function loadColaboradores() {
        const colaboradores = JSON.parse(localStorage.getItem('colaboradores')) || [];
        colaboradorList.innerHTML = '';
        colaboradores.forEach((colaborador, index) => {
            const li = document.createElement('li');
            li.textContent = `ID: ${colaborador.id}, Nome: ${colaborador.nome}, Cargo: ${colaborador.cargo}, Departamento: ${colaborador.departamento}`;
            
            // Botão de Editar
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.addEventListener('click', () => editColaborador(index));
            
            // Botão de Excluir
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.addEventListener('click', () => deleteColaborador(index));
            
            li.appendChild(editButton);
            li.appendChild(deleteButton);
            colaboradorList.appendChild(li);
        });
    }

    // Função para preparar o formulário para edição de colaborador
    function editColaborador(index) {
        const colaboradores = JSON.parse(localStorage.getItem('colaboradores')) || [];
        const colaborador = colaboradores[index];
        
        document.getElementById('id').value = colaborador.id;
        document.getElementById('nome').value = colaborador.nome;
        document.getElementById('cargoSelect').value = colaborador.cargo;
        document.getElementById('departamentoSelect').value = colaborador.departamento;
        
        editIndex = index;
        document.querySelector('button[type="submit"]').textContent = 'Atualizar';
    }

    // Função para excluir um colaborador
    function deleteColaborador(index) {
        let colaboradores = JSON.parse(localStorage.getItem('colaboradores')) || [];
        colaboradores.splice(index, 1);
        localStorage.setItem('colaboradores', JSON.stringify(colaboradores));
        loadColaboradores();
    }

    // Configurar o envio do formulário de cargos
    cargoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const cargoNome = document.getElementById('cargoNome').value;

        addCargo(cargoNome);
        cargoForm.reset();
    });

    // Configurar o envio do formulário de departamentos
    departamentoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const departamentoNome = document.getElementById('departamentoNome').value;

        addDepartamento(departamentoNome);
        departamentoForm.reset();
    });

    // Configurar o envio do formulário de colaboradores
    colaboradorForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const id = document.getElementById('id').value;
        const nome = document.getElementById('nome').value;
        const cargo = document.getElementById('cargoSelect').value;
        const departamento = document.getElementById('departamentoSelect').value;

        const colaboradores = JSON.parse(localStorage.getItem('colaboradores')) || [];
        
        if (editIndex >= 0) {
            // Atualizar colaborador existente
            colaboradores[editIndex] = { id, nome, cargo, departamento };
            editIndex = -1;
            document.querySelector('button[type="submit"]').textContent = 'Salvar';
        } else {
            // Adicionar novo colaborador
            colaboradores.push({ id, nome, cargo, departamento });
        }

        localStorage.setItem('colaboradores', JSON.stringify(colaboradores));
        colaboradorForm.reset();
        loadColaboradores();
    });

    // Inicializar o estado dos formulários
    function initializeForms() {
        document.getElementById('id').value = '';
        document.getElementById('nome').value = '';
        document.getElementById('cargoSelect').value = '';
        document.getElementById('departamentoSelect').value = '';
        document.querySelector('button[type="submit"]').textContent = 'Salvar';
    }

    // Carregar cargos, departamentos e colaboradores, e inicializar formulários
    loadCargos();
    loadDepartamentos();
    loadColaboradores();
    initializeForms();
});
