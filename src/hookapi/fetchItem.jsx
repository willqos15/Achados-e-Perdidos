import axios from "axios";

//exporta função pra usar fora desse arquivo
export const ListarItem = async ()=>{
    //pega domente a propriedade {data} retornada do axios
    const {data} = await axios.get("http://localhost:3000/perdidos")
    return data
}

export const EditarItem = async (id, dados)=>{
    const {data} = await  axios.put(`http://localhost:3000/perdidos/${id}`, dados, {withCredentials : true})
    return data
}

export const DeletaItem = async (id)=> {
    const {data} = await axios.delete(`http://localhost:3000/perdidos/${id}`, {withCredentials : true})
    return data
}