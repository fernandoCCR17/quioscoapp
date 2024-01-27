import Image from "next/image"
import useQuiosco from "../hooks/useQuiosco"

function Categoria({categoria}) {
  const {categoriaActual, handleClickCategoria} = useQuiosco();
    const {nombre, icono, id} = categoria

  return (
    <div className={`${categoriaActual?.id === id ? "bg-amber-400" : ""} flex items-center gap-4 w-full border p-5 hover:bg-amber-400 transition-colors`}>
      <Image 
        alt={`imagen icono ${icono}`} 
        width={80} 
        height={80} 
        src={`./assets/img/icono_${icono}.svg`}
      />

      <button
        type="button"
        className="text-lg lg:text-2xl font-bold hover:cursor-pointer"
        onClick={() => handleClickCategoria(id)}
      >
        {nombre}
      </button>
    </div>
  )
}

export default Categoria