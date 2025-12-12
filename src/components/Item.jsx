import styles from "./Item.module.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom";



/*Num projeto pessoal aqui, usei a Cloudflare para guardar as imagens
O frontend ficou no Github Pages mesmo

Quanto ao upload, tem 3 opções: 1 salvar no S3, 2 salvar no Dropbox, 3 salvar em diretório do servidor, onde está o backend
E no banco de dados, salva apenas a referência do arquivo.

por um grid, alinhar a esquerda.
*/

function Item({ nome, descricao, local, dono, contato, img, imgtexto, admin, id, fdel,fedit}) {
    const [aberto, setAberto] = useState(false)

    const navigate = useNavigate();
    function editar(meuid){
        console.log(`meu id pra editar é ${meuid}`)
        navigate(`/editar`)
    }

    

    return (

        
        <div className={styles.item}>

            <div className={styles.imagem}>

                <img src={img} alt={imgtexto} />
                
                {admin && <>
                
                <button
                onClick={()=>{
                    fedit(id)
                    editar(id)}}
                className={styles.btnadmin}>Editar
                </button>
                
                <button onClick={()=>fdel(id)} className={styles.btnadmin}>Apagar</button></>}
            </div>

            <div className={styles.titulo} onClick={() => { setAberto(!aberto )}}>
                <label> {nome} </label> 
                

                {aberto ? "":<p className={aberto? styles.pon: styles.poff}>clique para saber mais </p>  }
               
            </div>
              
                <div className={aberto ? styles.on : styles.off}>
                    <label htmlFor=""> <strong>Descrição: </strong>{descricao}</label>
                    <label htmlFor=""> <strong>Local onde foi perdido: </strong>{local}</label>
                    <label htmlFor=""> <strong>Proprietário: </strong>{dono} </label>
                    <label htmlFor=""> <strong>Contato: </strong>{contato}</label>
                </div>
        
                
                







        </div>

    )
}
export default Item