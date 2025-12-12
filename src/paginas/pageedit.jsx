import Formulario from "../components/formulario"
import { useEffect, useState } from 'react'
import axios from 'axios'

function PageEdit () {

          const [itens,setItens] = useState([]) 
          const id = []
        
          useEffect(()=>{
        
          axios.get("http://localhost:3000/perdidos")
          .then((resposta)=>{
            setItens(resposta.data)
            console.log(resposta.data)
            itens.map( (x)=>{
                itemedit.nome= x.nome
                itemedit.descricao= x.descricao
                itemedit.local= x.local
                itemedit.proprietario = x.proprietario
                itemedit.contato=x.contato
            }
                
            ).then(console.log(itemedit))
          })
          .catch(erro=>console.log("erro: "+erro))
        
        },[])



    return(
        <>

        <h1> Editar Item: </h1>
        <Formulario inicial={itens}/>

    
        <p></p>
        </>
    )

}

export default PageEdit