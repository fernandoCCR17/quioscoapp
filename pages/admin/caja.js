import useSWR from "swr"
import axios from "axios"
import AdminLayout from "../../layout/AdminLayout"
import OrdenLista from "../../components/OrdenLista"

export default function Caja(){
    const fetcher = () => axios("/api/ordenes/listas").then(datos => datos.data)
    const { data, error, isLoading } = useSWR('/api/ordenes/listas', fetcher, {refreshInterval: 100})

    return (
        <AdminLayout pagina={"Area de Cajas"}>
            <h1 className="text-4xl font-black">Area de Cajas</h1>
            <p className="text-2xl my-10">Administra las ordenes listas</p>

            {data && data.length ? data.map(ordenLista => (
                <OrdenLista 
                    key={ordenLista.id}
                    ordenLista={ordenLista}
                />
            )) : !isLoading && <p>No hay ordenes pendientes</p>}
        </AdminLayout>
    )
}