import { useContext, useState} from "react"
import { ContextNavbar } from "../ContextNavbar"
import Item from "../components/Item"
import imgteste from '../img/teste.jpg'

function PageBusca(){

    const {itens,setItens,barraBusca,setBarraBusca} = useContext(ContextNavbar)
    
    return(<>

    {!itens && <p>Item não encontrado!</p>}
    {itens && <> 
    {itens.map(x=> (
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
    </>
    }


    </>)
}

export default PageBusca