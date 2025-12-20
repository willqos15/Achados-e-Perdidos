import axios from "axios"
import {useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import styles from './PainelAdm.module.css'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Loginadm } from "../hookapi/fetchItem"

function PainelAdm (){
    
    const[msglogin,setMsgLogin] = useState("")

    const {handleSubmit, watch, register, formState: {errors}} = useForm({mode: "onChange"})
    const navigate = useNavigate()


    
        const queryClient = useQueryClient()
        const mutationLogin = useMutation(
            {mutationFn: (dados)=> Loginadm(dados),
            onSuccess: (data)=>{
                const token = data.token
                localStorage.setItem("token", token)
                navigate('/gerenciar')
            }
             }
        )

    function login(dados){
        mutationLogin.mutate(dados)
    }

    useEffect(()=>{ 
        

        setTimeout(()=>{
            if(msglogin==="erro"){
                setMsgLogin("")}
        },5000)

        },[msglogin])

    return(
        <div className={styles.loginmain}>

            {mutationLogin.isLoading && <p>Carregando...</p>}
            {mutationLogin.isError && <p>Erro...</p>}

            {!mutationLogin.isLoading && <>
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
        </>}
        
        </div>
    )
}

export default PainelAdm