import Item from '../components/Item'
import { useQuery } from '@tanstack/react-query';
import { ListarItem } from '../hookapi/fetchItem';
import styles from "./pageprincipal.module.css"
import loading from '../img/load.gif'

function PagePrincipal (){

      //puxa apenas as propriedades desejadas do query
      //data são os dados pegos do QueryFn
      const {data, isLoading, error} = useQuery({
        queryKey: ["itens"],
        queryFn: ListarItem
      })

      if (isLoading) return <img src={loading}
                  className={styles.imgload}/>
                  
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



    return(<>

    <div className={styles.container}>



    {data.length<=0 &&
    <p className={styles.pavisook}>Nenhum item cadastrado! </p>
    }

    {data?.map(x=> (
        <Item
     Nome= {x.nome}
     Img= {x.foto}
     Imgtexto = "item perdido"
     Descricao= {x.descricao}
     local= {x.local}
     Dono = {x.proprietario}
     Contato={x.contato}
     key={x._id}
     id={x._id}
     admin={false}/>
    ))}

    </div>
     
    
    </>)
}
export default PagePrincipal