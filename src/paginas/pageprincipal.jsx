import Item from '../components/Item'
import imgteste from '../img/teste.jpg'
import { useEffect, useState } from 'react';
import axios from 'axios'  //npm install axios para consumir API


function PagePrincipal (){

      const [itens,setItens] = useState([]) 
    
      useEffect(()=>{
    
      axios.get("http://localhost:3000/perdidos")
      .then((resposta)=>{
        setItens(resposta.data)
        console.log(itens)
      })
      .catch(erro=>console.log("erro: "+erro))
    
    },[])



    return(<>

    <div className="conteiner">

    {itens.map(x=> (
        <Item
     Nome= {x.nome}
     Img= {imgteste}
     Imgtexto = "item perdido"
     Descricao= {x.descricao}
     local= {x.local}
     Dono = {x.proprietario}
     Contato={x.contato}
     key={x._id}
     id={x._id}
     admin={false}/>
    ))}

    </div>
     
    
    </>)
}
export default PagePrincipal