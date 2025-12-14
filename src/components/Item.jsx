import styles from "./Item.module.css"
import { useEffect, useState } from "react"
import { useForm } from 'react-hook-form'


/*DICAS TELEGRAM:
Num projeto pessoal aqui, usei a Cloudflare para guardar as imagens
O frontend ficou no Github Pages mesmo

Quanto ao upload, tem 3 opções: 1 salvar no S3, 2 salvar no Dropbox, 3 salvar em diretório do servidor, onde está o backend
E no banco de dados, salva apenas a referência do arquivo.

por um grid, alinhar a esquerda.
*/

function Item({ Nome, Descricao, local, Dono, Contato, Img, Imgtexto, admin, id, fdel, valoresget, fatualizar }) {
    const [aberto, setAberto] = useState(false)
    const [editando, setEditando] = useState(false)
    const [msg,setMsg] = useState(false)
    const { register, handleSubmit, formState: {errors}, reset, trigger} = useForm({ mode: "onChange",
        defaultValues: {nome: "", descricao: "", local: "", proprietario: "", contato: ""}
    })

    //Puxa os valores e preenche o formulario
    function editar() {
        setEditando(!editando)
        //resetar( busca valores de determinado id)
        console.log(valoresget)
         reset(valoresget.find(x => x._id == id))    
        
    }

    
    



    return (


        <div className={styles.item}>

            <div className={styles.imagem}>

                <img src={Img} alt={Imgtexto} />

                {admin && <>

                    <button
                        onClick={() => {
                            editar()
                        }}
                        className={styles.btnadmin}>Editar
                    </button>

                    <button onClick={() => fdel(id)} className={styles.btnadmin}>Apagar</button></>}
            </div>

            <div className={styles.titulo} onClick={() => { setAberto(!aberto) }}>
                <label> {Nome} </label>


                {/*FRASE SAIBA MAIS PARA USUÁRIO GERAL*/}
                {!admin ? <p className={aberto ? styles.pon : styles.poff}>
                    clique para saber mais </p> : null}
            </div>

            {/*VERSÃO BOTÃO PARA USUÁRIO GERAL*/} 
            {!admin ?
                <div className={aberto ? styles.on : styles.off}>
                    <label> <strong>Descrição: </strong>{Descricao}</label>
                    <label> <strong>Local onde foi perdido: </strong>{local}</label>
                    <label> <strong>Proprietário: </strong>{Dono} </label>
                    <br/>
                </div>
                : null}

            {/*VERSÃO FORMULÁRIO PARA EDITAR COMO ADIMINISTRADOR*/}
             {admin ?
                <div className={editando ? styles.on : styles.off}> 

                     <form onSubmit={handleSubmit((dados) => fatualizar(dados, id))}>
                        <label> <strong>Nome: </strong></label>
                        <input {... register("nome", { required: true })} type="text" />
                        {errors.nome && <p>Campo obrigatório</p>}

                        <label> <strong>Descrição: </strong></label>
                        <input  {...register("descricao", { required: true })} type="text" />
                        {errors.descricao && <p>Campo obrigatório</p>}

                        <label> <strong>Local onde foi perdido: </strong></label>
                        <input  {...register("local", { required: true })} type="text" />
                        {errors.local && <p>Campo obrigatório</p>}

                        <label> <strong>Proprietário: </strong></label>
                        <input  {...register("proprietario", { required: true })} type="text" />
                        {errors.proprietario && <p>Campo obrigatório</p>}

                        <label> <strong>Contato: </strong></label>
                        <input {...register("contato", { required: "Campo obrigatório", minLength: { value: 11, message: "O número precisa ter no mínimo 10 digítos. Não esqueça o DDD." } })} type="text" placeholder='(DDD) 90000 0000' />
                        {errors.contato && <p>{errors.contato.message}</p>}
                        {msg}
                        <button onClick={()=>{
                            setMsg(trigger())
                            setEditando(false)
                            }} type="submit" className={styles.btsave}>Salvar</button>
                    </form> 
                 </div>
                : null} 










        </div>

    )
}
export default Item


