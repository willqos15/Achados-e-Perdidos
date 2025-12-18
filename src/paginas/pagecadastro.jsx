
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Formulario from '../components/formulario'
import { useState } from 'react'
import styles from './pagecadastro.module.css'
//npm install react-hook-form


function PageCadastro() {

    const[estado,setEstado] = useState("inicio")

    function enviar(dados){
        
        
        dados.encontrado = false
        var dadosjson = dados
        
        axios.post("http://localhost:3000/cadastro", dadosjson, {withCredentials : true})
        .then((resposta)=>{
            if(resposta.status === 201 || resposta.status ===200){
                console.log("Cadastro feito com sucesso. ", resposta.status)
                setEstado("fim")
            }else{
                console.log("Dado recebido com erro. ", resposta.status)
            }})
        .catch((erro)=>{console.error("Erro:", erro)})

        }
    

    const { register, handleSubmit, formState:{errors }, reset} = useForm( {mode: "onChange"})
    
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
    return (<>

    {estado==="fim" && <p className={styles.resposta}> Cadastro feito com sucesso!</p>}
    <Formulario funcao={enviar}/>

        


    </>)
}
export default PageCadastro