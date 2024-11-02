import React, {useState, useEffect} from "react";
import './TodoList.css' 
import icone from './assets/lista.png'
function TodoList() {

    const listarmazenar = localStorage.getItem('Lista');

    const [lista, setLista] = useState (listarmazenar ? JSON.parse(listarmazenar) : []);
    const [novoitem, setnovoitem] = useState ([]);

    useEffect(()=>{
        localStorage.setItem('Lista', JSON.stringify(lista));
    },[lista])

    function adicionaitem(form){
        form.preventDefault();
        if(!novoitem){
            return;
        } 
        setLista([...lista, {text: novoitem, isCompleted: false}])
        setnovoitem("");
        document.getElementById('inputentrada').focus();
    }
    
    function clicou(index){
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }

    function deleta(index){
        const listaAux = [...lista];
        listaAux.splice(index, 1);
        setLista(listaAux);
    }

    function deletatudo() {
        setLista([]);
    }

    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <form onSubmit={adicionaitem}>
                <input type="text" id="inputentrada"
                 value={novoitem} 
                 onChange={(e)=>{setnovoitem(e.target.value)}}
                 placeholder="Insira uma tarefa"/>
                <button className="add" type="submit">Adicionar</button>
            </form>
            <div className="listaTarefas">
                <div>
                    {
                        lista.length <1
                        ?
                        <img className="iconecentral"src={icone}/>
                        :  
                        lista.map((item, index)=>(
                        <>
                        <div key={index} className={item.isCompleted ? "item completo" : "item"}>
                            <span onClick={()=>{clicou(index)}}>{item.text}</span>
                            <button onClick={()=>{deleta(index)}} className="del">Deletar</button>
                        </div>
                        </>
                        ))
                    }
                    {
                        lista.length >0 && 
                        <div>
                        <button onClick={()=>{deletatudo()}}className="deleteall">Deletar tudo</button>
                        </div>  

                    }

                </div>
            </div>   
        </div>
    );
}

export default TodoList;