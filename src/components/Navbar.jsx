import styles from "./Navbar.module.css"
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { ContextNavbar } from "../ContextNavbar";
import { FaSearch } from "react-icons/fa";



function Navbar() {


  const navigate = useNavigate()
  const { itens, setItens, barraBusca, setBarraBusca, adm, setAdm } = useContext(ContextNavbar)
  const [menu, setMenu] = useState(false)
  const [wbarra, setWBarra] = useState("")

 
  function pesquisar(e) {
    e.preventDefault()

    //verifica se existe algo no barra busca retirando os espaços
    if (!barraBusca.trim()) {
      return
    }

    axios.get(`${import.meta.env.VITE_URLAPI}/busca/${barraBusca.trim()}`)
      .then((resposta) => {
        setItens(resposta.data)
        navigate('/busca')


      })
      .catch(erro => {
        if (erro.status === 404) {
          navigate('/busca')
          setItens(null)
        }
        else { setItens(null) }
      }

      )
  }



  function telaadm() {
    const token = localStorage.getItem("token")
    if (!token) return navigate('./painel')
    axios.get(`${import.meta.env.VITE_URLAPI}/testelogin`,
      { headers: { authorization: `Bearer ${token}` } })
      .then(() => {
        navigate('/gerenciar')
        setAdm(true)
      })
      .catch(() => {
        navigate('/painel')
        setAdm(false)
      })

  }

  function inputpesquisa(valor) {
    setBarraBusca(valor.target.value)

  }

  function tampasquisa() {
    const barra = document.getElementsByName("pesquisa")[0]
    const largura = barra.getBoundingClientRect().width

    console.log(largura)
    //mesmo valor do .principal form input{min-width: 90px;}
    if (largura <= 90) {
      setWBarra("on")
    }
  }

  function sair() {
    localStorage.removeItem("token")
    navigate('/painel')
    setAdm(false)
  }


  function paginacriar() { navigate('/cadastro') }

  function paginainicial() { navigate('/') }



  return (
    <>

      <header className={styles.principal}>

        <div onClick={paginainicial} className={styles.titulo}>
          {wbarra === "on" ?
          <h1 className={styles.bh1}></h1>
          : <h1 className={styles.h1ok}>Achados & Perdidos</h1>}
        </div>

        <div className={styles.itens}>

          <form onSubmit={pesquisar}>
            <div className={styles.caixabusca}>
              <FaSearch className={wbarra === "on" ? styles.digicon : styles.iconebusca} />

              <input
                onFocus={tampasquisa}
                onBlur={() => setWBarra("")}
                onChange={inputpesquisa}
                className={wbarra === "on" ? styles.digitando : styles.inputbusca}
                name="pesquisa" type="search" placeholder="Pesquisar" />
            </div>
          </form>

          <div className={styles.contm}>
            <button onClick={() => { 
              if (!menu) {setMenu(true)
                setTimeout(()=>{
              setMenu(false)},6000)
              }

              if (menu){setMenu(false)}
            }}
              
              className={styles.menubtn}>
              <span></span><span></span><span></span>
            </button>

            <nav className={menu ? styles.moption : styles.moptioff}>
              <span><Link to="/" className={styles.link}>Inicio</Link></span>
              <span onClick={telaadm}>Gerenciar</span>
              {adm && <>
              <span onClick={paginacriar}>Cadastrar</span>
              <span onClick={sair}>Sair</span>
              </>}
            </nav>

          </div>




          {/* <ul className={styles.mopcoes}>
            <li>
               <Link to="/" className={styles.link}> <li> Início </li></Link>
            </li>
            <li>
              <li onClick={telaadm} className={styles.link}> Gerenciar </li>
            </li>

          </ul> */}

        </div>


      </header>


    </>

  )
}

export default Navbar