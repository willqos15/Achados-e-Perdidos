import styles from '../components/formulario.module.css'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { use, useRef, useState } from 'react'


function Formulario({ funcao }) {

  const foto = useRef(null)
  const [estado,setEstado] = useState("1")
  const [msgfoto,setMsgFoto] = useState()
 

  function enviar(dados) {
    

    console.log("funcao")
    if (!foto.current){ return setMsgFoto("erro")}

    console.log("foto okay")
    setMsgFoto("")

    const fotoup = new FormData()
    fotoup.append("file", foto.current)

    setEstado("load")
    axios.post(`${import.meta.env.VITE_URLAPI}/upload`, fotoup,
      {headers: {authorization: `Bearer ${import.meta.env.VITE_BTOKEN}`}}
    )
      .then((resposta) => {
        console.log(resposta.data.url)
        const imagemurl = resposta.data.url
        const finalData = { ...dados, foto: imagemurl }
        console.log(finalData)
        funcao(finalData)
        reset()

        setTimeout(()=>{
           setEstado("1")
        },1000)
       
        
      }
      )
      .catch((erro) => { console.log(erro) 
        setTimeout(()=>{
           setEstado("1")
        },1000)
      })
  }




  const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: "onChange" })

  /*
register - linka o input ao React Hook Form (essencial)
handleSubmit - garante a validação antes de rodar a função
watch - observa valores em tempo real
reset - reseta o formulário inteiro
resetField - reseta um campo em especifico
setValue - força um valor manualmente
getValues - pega os valores sem precisar do watch
trigger - força validação de um campo ou todo formulario
formState - usa objeto com estados uteis 
control - usado em compomentes controlado como <Controller/>
setError - seta erros manualmente
clearErrors - limpa erros
*/
function Scrollar(e){

  setTimeout(()=>{
    e.target.scrollIntoView(
    {behavior: "smooth", block: "center"})
  }
    ,300)

}

  return (<>

  
    {estado==="load" && <p>Carregando...</p>}
    

    <form onSubmit={handleSubmit(enviar)} className={styles.formulario}>
      {estado==="1" && 
      <>
      
      <label> Nome do item perdido:</label>
      <input {...register("nome", { required: true })} type="text" placeholder="Exemplo: Lápis, borracha e etc." onFocus={Scrollar}/>
      {errors.nome && <p>Campo obrigatório</p>}

      <label> Carregue uma imagem do item:</label>
      <input type='file' name="file" onChange={e => foto.current = e.target.files[0]} onFocus={Scrollar} />
      {msgfoto==="erro" && <p>Campo obrigatório</p>}
      

      <label> Descrição:</label>
      <textarea {...register("descricao", { required: true })} rows={2} placeholder='Descreva a aparência, cor, tamanho, detalhes e etc.' onFocus={Scrollar}/>
      {errors.descricao && <p>Campo obrigatório</p>}
      

      <label> Local onde foi perdido:</label>
      <input {...register("local", { required: true })} type="text" placeholder='Exemplo: Pátio, Sala e etc.' onFocus={Scrollar}/>
      {errors.local && <p>Campo obrigatório</p>}
      
      <label> Proprietário:</label>
      <input {...register("proprietario", { required: true })} type="text" placeholder='Nome completo.' onFocus={Scrollar}/>
      {errors.proprietario && <p>Campo obrigatório</p>}

      <label> Contato (Whatsapp):</label>
      <input {...register("contato", { required: "Campo obrigatório", minLength: { value: 11, message: "O número precisa ter no mínimo 10 digítos. Não esqueça o DDD." } })} type="number" placeholder='(DDD) 90000 0000' onFocus={Scrollar}/>
      {errors.contato && <p>{errors.contato.message}</p>}
      
      <input type="submit" value="Enviar" className={styles.botaoenviar} />
        
      </>
      }
    </form>
    
    


  </>)
}
export default Formulario