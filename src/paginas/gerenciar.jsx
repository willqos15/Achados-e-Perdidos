import Item from '../components/Item'
import imgteste from '../img/teste.jpg'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import PageEdit from './pageedit'

function Gerenciar () {

    const [itens,setItens] = useState([]) 

    function editar(id){
      console.log(id)
    }

    function deletar (id) {
        axios.delete(`http://localhost:3000/perdidos/${id}`)
        .then(()=>{
            //filter percorre toda lista e retorna somente o que a comparação for verdadeira
            setItens(itemx=> itemx.filter(x=> x._id !== id))
        
        })
        .catch(erro=>console.log("ERRO"+erro))
    }
    
      useEffect(()=>{
    
      axios.get("http://localhost:3000/perdidos")
      .then((resposta)=>{
        setItens(resposta.data)
        console.log(`meu id é ${resposta.data[0]._id}`)
      })
      .catch(erro=>console.log("erro: "+erro))
    
    },[])

    return(<>
   

  

      
    <div className="conteiner">

        {itens.map(x=> (
        <Item
     nome= {x.nome}
     img= {imgteste}
     imgtexto = "item perdido"
     descricao= {x.descricao}
     local= {x.local}
     dono = {x.proprietario}
     contato={x.contato}
     key={x._id}
     id={x._id}
     admin={true}
     fdel={deletar}
     fedit={editar}/>
    ))}

    </div>

     
    
    
    </>)

}
export default Gerenciar