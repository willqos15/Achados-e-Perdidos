import axios from "axios"
import { Navigate, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import styles from './PainelAdm.module.css'

function PainelAdm (){
    
    const {handleSubmit, register, formState: {errors}} = useForm({mode: "onChange"})
    const navigate = useNavigate()

    function login(dados){

        axios.post('http://localhost:3000/testelogin',dados, {withCredentials:true})
        .then((resposta)=>{
            if(resposta.status === 200){
                console.log("Login feito com sucesso", resposta.status)
                navigate('/gerenciar')
            }
            

        })
        .catch((erro)=>{console.log("usuario ou senha incorreta", erro)})
        
    }

    return(
        <div className={styles.loginmain}>

        <h2>Área Restrita</h2>
        <form onSubmit={handleSubmit(login)}>

        <div>
        <label>Login: </label>
        <input {... register("email", {required: true})}type="text"/>
        {errors.email && <p>Preencha o campo de Login!</p>}
        </div>

        <div>
            <label>Senha: </label>
            <input {... register("password", {required: true})} type="password"></input>
        {errors.password && <p>Preencha o campo de Senha!</p>}
        </div>

        <button type="submit" className={styles.btnlogin}> Enviar </button>
        </form>
        
        </div>
    )
}

export default PainelAdm