import styles from '../components/formulario.module.css'
import { useForm } from 'react-hook-form'

function Formulario({funcao, inicial}) {

    function enviar (dados)  {
        funcao(dados)
        reset()
        
    }
    

    const { register, handleSubmit, formState:{errors }, reset} = useForm( {mode: "onChange", defaultValues: inicial})
    
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

       
        <form onSubmit={handleSubmit(enviar)} className={styles.formulario}>
            <label> Nome do item perdido:</label>
            <input {... register("nome", {required: true})} type="text" placeholder="Exemplo: Estojo, Chupeta, Lápis, Garrafa de água e etc." />
            {errors.nome && <p>Campo obrigatório</p>}

            <label> Descrição:</label>
            <textarea {... register("descricao", {required: true} )} rows={5}  placeholder='Descreva a aparência, cor, tamanho, detalhes e etc.'/>
            {errors.descricao && <p>Campo obrigatório</p>}

            <label> Local onde foi perdido:</label>
            <input {... register("local" , {required: true})} type="text" placeholder='Exemplo: Pátio, Sala de aula, Quadra e etc.' />
            {errors.local && <p>Campo obrigatório</p>}

            <label> Proprietário:</label>
            <input {... register("proprietario", {required: true})} type="text" placeholder='O nome completo do dono do objeto.'/>
            {errors.proprietario && <p>Campo obrigatório</p>}

            <label> Contato (Whatsapp):</label>
            <input {... register("contato", {required: "Campo obrigatório", minLength: {value: 11, message: "O número precisa ter no mínimo 10 digítos. Não esqueça o DDD."}})} type="text"  placeholder='(DDD) 90000 0000' />
            {errors.contato && <p>{errors.contato.message}</p>}

            <input type="submit" value="Enviar" className={styles.botaoenviar} />
        </form>


    </>)
}
export default Formulario