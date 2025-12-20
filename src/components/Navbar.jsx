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

    axios.get(`${import.meta.env.VITE_URLAPI}/busca/${barraBusca.trim()}`)
        .then((resposta)=>{
          setItens(resposta.data)
          console.log(resposta.data)
          navigate(`/busca`)

        })
        .catch(erro=>{
          if(erro.status === 404) { window.alert("Não enconstrado")}
          else{
          console.log("erro: "+erro)}})
  }
      


  function telaadm(){
     const token = localStorage.getItem("token")
     if (!token) return navigate('./painel')
    axios.get(`${import.meta.env.VITE_URLAPI}/testelogin`, 
      {headers: {authorization: `Bearer ${token}`}})
    .then(()=> navigate('/gerenciar'))
    .catch(()=> navigate('/painel'))
    
  }
        
      
    

    return(
      <>

    <div className={styles.principal}>

      <div className={styles.titulo}>
        <h1>Achados & Perdidos</h1>
      </div>

      <div className={styles.itens}>
        <ul>
          <Link to="/" className={styles.link}> <li> Início </li></Link>
          <li onClick={telaadm} className={styles.link}> Gerenciar </li>
       
          
        </ul>
           <form onSubmit={pesquisar}>
          <input onChange={valor=> setBarraBusca(valor.target.value)}  type="search" placeholder=" Pesquise aqui" />
          </form>
      </div>
      
      
    </div>
  

    </>
    
    )}

export default Navbar