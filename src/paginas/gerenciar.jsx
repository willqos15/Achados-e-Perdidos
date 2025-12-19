import Item from '../components/Item'
import imgteste from '../img/teste.jpg'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import styles from "./gerenciar.module.css"


function Gerenciar () {

  const navigate = useNavigate()

    const [itens,setItens] = useState([]) 

  

    function paginacriar(){ navigate('/cadastro')}

        function fatualizar(dados, id){
    
            axios.put(`http://localhost:3000/perdidos/${id}`, dados, {withCredentials : true})
            .then((res)=> { 
              
              //atualiza - mapeia todos itens, e o que tiver id igual recebe o valor atualizado
                setItens(itemx=> itemx.map(x=> x._id == id ? res.data: x))
                
            })
            .catch(erro=> console.log("erro ao atualizar", erro))
        }

    function deletar (id) {
        axios.delete(`http://localhost:3000/perdidos/${id}`, {withCredentials : true})
        .then(()=>{
            //filter percorre toda lista e retorna somente o que a comparação for verdadeira
            setItens(itemx=> itemx.filter(x=> x._id !== id))
            
        
        })
        .catch(erro=>console.log("ERRO"+erro))
    }

    function sair(){
      axios.post('http://localhost:3000/logout')
      .then(()=>navigate('/'))
      .catch(erro=>console.log("ERRO: ", erro))
    }
    
      useEffect(()=>{
    
      axios.get("http://localhost:3000/perdidos")
      .then((resposta)=>{
        setItens(resposta.data)
      })
      .catch(erro=>console.log("erro: "+erro))
    
    },[])

    return(<>
   

  

      <div className={styles.botoesger}>

    
        <button onClick={paginacriar} className={styles.btncriar}>
          Cadastrar ítem
        </button>

        <button className={styles.btnreport}>
          Reportar problema
        </button>

        <button onClick={sair} className={styles.btnlogout}>
          Sair da Conta
        </button>
      </div>
    <div className="conteiner">

        {itens.map(x=> (
        <Item
     Nome= {x.nome}
     Img= {x.foto}
     Imgtexto = "item perdido"
     Descricao= {x.descricao}
     local= {x.local}
     Dono = {x.proprietario}
     Contato={x.contato}
     key={x._id}
     id={x._id}
     admin={true}
     fdel={deletar}
     fatualizar={fatualizar}
     valoresget={itens}/>
    ))}

    </div>

     
          <div>

      </div>
    
    </>)

}
export default Gerenciar