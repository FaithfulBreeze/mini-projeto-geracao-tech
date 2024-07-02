function abrirModal(){
    overlay.classList.add('active')
    criarTarefa.classList.add('active')
}

function fecharModal(){
    overlay.classList.remove('active')
    criarTarefa.classList.remove('active')
}

function buscarTarefa(){
    fetch('http://localhost:9876/tarefas')
    .then(res => res.json())
    .then(res =>{
        inserirTarefas(res)
    })
}

buscarTarefa()

function inserirTarefas(tarefas){
    if(tarefas.length){
        listaDeTarefas.innerHTML = ''
        tarefas.forEach(tarefa => {
            listaDeTarefas.innerHTML += `
                <li>
                    <h5>${tarefa.titulo}</h5>
                    <p>${tarefa.desc}</p>
                    <div class="actions">
                        <box-icon onclick="deletarTarefa(${tarefa.id})" name="trash"></box-icon>
                    </div>
                </li>`
        });
    }else{
        tarefasPlaceholder.innerHTML = 'Nenhuma tarefa registrada...'
    }
}

function novaTarefa(){
    let tarefa = {
        titulo: titulo.value,
        desc: descricao.value
    }
    event.preventDefault()
    fetch('http://localhost:9876/tarefas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarefa)
    })
    .then(res => res.json())
    .then(res => {
        fecharModal()
        buscarTarefa()
    })
}

function deletarTarefa(id){
    fetch(`http://localhost:9876/tarefas/${id}`, {
        method: 'DELETE'
    })
    .then(res => buscarTarefa())
}

function pesquisarTarefa(){
    const lis = document.querySelectorAll('li')
    if(busca.value){
        lis.forEach(li => {
            if(!li.children[1].innerText.includes(busca.value)){
                li.style.visibility = 'hidden'
            }
        })
    }else{
        buscarTarefa()
    }
}