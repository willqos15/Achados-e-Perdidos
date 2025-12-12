import styles from "./Navbar.module.css"
import { Link } from "react-router-dom";



function Navbar () {

    return(
      <>

    <div className={styles.principal}>

      <div className={styles.titulo}>
        <h1>Achados & Perdidos</h1>
      </div>

      <div className={styles.itens}>
        <ul>
          <li> <Link to="/" className={styles.link}>Página Inicial</Link> </li>
          <li> <Link to="/cadastro" className={styles.link}>Cadastrar item</Link></li>
          <li> <Link to='/gerenciar' className={styles.link}>Gerenciar</Link> </li>
          
          <input type="search" name="" id="" placeholder=" Pesquise aqui" />
        </ul>
      </div>
      
    </div>
    <hr/>

    </>
    
    )}

export default Navbar