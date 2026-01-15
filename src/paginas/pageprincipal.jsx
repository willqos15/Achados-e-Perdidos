import Item from '../components/Item'
import { useQuery } from '@tanstack/react-query';
import { ListarItem } from '../hookapi/fetchItem';
import styles from "./pageprincipal.module.css"
import loading from '../img/load.gif'

function PagePrincipal() {

  //puxa apenas as propriedades desejadas do query
  //data são os dados pegos do QueryFn
  const { data, isLoading, error } = useQuery({
    queryKey: ["itens"],
    queryFn: ListarItem
  })

  if (isLoading) {
    
    return <>
    <img src={loading}
      className={styles.imgload}/>
      <div className={styles.alertateste}>
      <h3 className={styles.alertacentro}>Aviso: Versão de Teste</h3>
      <p>
        <strong>Observação:</strong> o site pode demorar a carregar no primeiro acesso, pois a hospedagem do servidor e do banco de dados está sendo feita de forma gratuita.
      </p>
    </div>
    </>
    }

  if (error) return <p className={styles.paviso}>Erro ao carregar itens</p>


  //  const [itens,setItens] = useState([]) 
  //   useEffect(()=>{
  //   axios.get("http://localhost:3000/perdidos")
  //   .then((resposta)=>{
  //     setItens(resposta.data)
  //     console.log(resposta.data)
  //   })
  //   .catch(erro=>console.log("erro: "+erro))
  // },[])



  return (<>

    <div className={styles.container}>

      <div className={styles.alertateste}>
        <h3 className={styles.alertacentro}>Aviso - Versão de Teste</h3>
        <p>
          Esta é uma de testes. Os visitantes podem criar, editar ou apagar itens, com limite de <strong>5 itens simultâneos</strong> cadastrados.
          Não nos responsabilizamos pelas informações ou pelo conteúdo das imagens inseridas.
        </p>
        <p>
          Para acessar o painel administrativo do site, utilize o login e senha abaixo:
        </p>
        <p className={styles.alertacentro}>
          <strong>Login:</strong> <code>admin</code><br />
          <strong>Senha:</strong> <code>admin</code>
        </p>
      </div>





      {data.length <= 0 &&
        <p className={styles.pavisook}>Nenhum item cadastrado! </p>
      }

      {data?.map(x => (
        <Item
          Nome={x.nome}
          Img={x.foto}
          Imgtexto="item perdido"
          Descricao={x.descricao}
          local={x.local}
          Dono={x.proprietario}
          Contato={x.contato}
          key={x._id}
          id={x._id}
          admin={false} />
      ))}

    </div>


  </>)
}
export default PagePrincipal