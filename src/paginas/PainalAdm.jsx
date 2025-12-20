import axios from "axios"
import {useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import styles from './PainelAdm.module.css'

function PainelAdm (){
    
    const[msglogin,setMsgLogin] = useState("")

    const {handleSubmit, watch, register, formState: {errors}} = useForm({mode: "onChange"})
    const changec = watch()
    const navigate = useNavigate()

    function login(dados){

        axios.post(`${import.meta.env.VITE_URLAPI}/testelogin`,dados)
        .then((resposta)=>{
            if(resposta.status === 200){
                
                const token = resposta.data.token
                localStorage.setItem("token", token)
                navigate('/gerenciar')
            }
            

        })
        .catch(()=>{
            setMsgLogin("erro")
        })
    }

    useEffect(()=>{ 
        

        setTimeout(()=>{
            if(msglogin==="erro"){
                setMsgLogin("")}
        },5000)

        },[msglogin])

    return(
        <div className={styles.loginmain}>

        <h2>Área Restrita</h2>
        <form onSubmit={handleSubmit(login)}>

        <div>
        <label>Login: </label>
        <input {... register("email", {required: true})}type="text"/>
        </div>

        <div>
            <label>Senha: </label>
            <input {... register("password", {required: true})} type="password"></input>
        </div>

        {(errors.email || errors.password) && <p className={styles.plogin}>Campo obrigatório</p>}
        {msglogin === "erro" && <p className={styles.plogin}> Login ou Senha incorreto!</p>}
        
        <button type="submit" className={styles.btnlogin}> Enviar </button>
        
        </form>
        
        </div>
    )
}

export default PainelAdm