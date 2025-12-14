import styles from "./Navbar.module.css"
import { Link } from "react-router-dom";
import { useContext, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { ContextNavbar } from "../ContextNavbar";



function Navbar () {

        
        const navigate = useNavigate()
        const {itens,setItens,barraBusca,setBarraBusca} = useContext(ContextNavbar)

      
  function pesquisar(e){
   e.preventDefault()
    
    //verifica se existe algo no barra busca retirando os espaços
    if(!barraBusca.trim()){return}
    console.log("buscando")

    axios.get(`http://localhost:3000/busca/${barraBusca.trim()}`)
        .then((resposta)=>{
          setItens(resposta.data)
          console.log(resposta.data)
          navigate(`/busca`)

        })
        .catch(erro=>console.log("erro: "+erro))
  }
      
        
      
    

    return(
      <>

    <div className={styles.principal}>

      <div className={styles.titulo}>
        <h1>Achados & Perdidos</h1>
      </div>

      <div className={styles.itens}>
        <ul>
          <li> <Link to="/" className={styles.link}>Página Inicial</Link> </li>
          <li> <Link to='/gerenciar' className={styles.link}>Painel de Controle</Link> </li>
          <form onSubmit={pesquisar}>
          <input onChange={valor=> setBarraBusca(valor.target.value)}  type="search" placeholder=" Pesquise aqui" />
          </form>
        </ul>
      </div>
      
    </div>
    <hr/>

    </>
    
    )}

export default Navbar