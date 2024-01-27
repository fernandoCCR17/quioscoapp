import Image from "next/image"
import axios from "axios"
import { toast } from "react-toastify"
import { formatearDinero } from "../helpers"

const OrdenLista = ({ordenLista}) => {
    const {id, nombre, total, pedido} = ordenLista
    console.log(ordenLista)

    async function completarOrden(){
      try {
        const data = await axios.put(`/api/ordenes/listas/${id}`)
        toast.success("Orden Entregada")
      } catch (error) {
        toast.error("Hubo un error")
      }
    }

  return (
    <div className="border p-10 space-y-5">
        <h3 className="text-2xl font-bold">Orden: {id}</h3>
        <p className="text-3xl font-bold text-blue-800">Cliente: {nombre}</p>

        <div>
            {pedido.map(platillo => (
              <div key={platillo.id} className="py-3 flex flex-col md:flex-row border-b last-of-type:border-0 items-center">
                <div className="w-32">
                  <Image 
                    width={400}
                    height={500}
                    src={`/assets/img/${platillo.imagen}.jpg`}
                    alt={`Imagen platillo ${platillo.nombre}`}
                  />
                </div>

                <div className="p-5 space-y-2">
                  <h4 className="text-xl font-bold text-amber-500">{platillo.nombre}</h4>
                  <div className="flex justify-between md:justify-start md:flex-col">
                    <p className="text-lg font-bold">Cantidad: {platillo.cantidad}</p>

                    <p className="text-lg font-bold text-amber-900">{formatearDinero(platillo.precio)}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="text-center md:flex md:items-center md:justify-between my-10">
          <p className="font-black text-4xl text-amber-500">
            Total a pagar: {formatearDinero(total)}
          </p>

          <button
            className="bg-green-600 hover:bg-green-800 text-white mt-5 md:mt-0 py-3 px-10 uppercase font-bold rounded-lg"
            type="button"
            onClick={completarOrden}
          >
            Orden Entregada
          </button>
        </div>
    </div>
  )
}

export default OrdenLista