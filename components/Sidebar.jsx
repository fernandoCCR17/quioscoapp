import Image from "next/image"
import useQuiosco from "../hooks/useQuiosco"
import Categoria from "./Categoria"

function Sidebar() {
  const { categorias } = useQuiosco();

  return (
    <>
        <Image 
          width={300} 
          height={200} 
          src="./assets/img/logo.svg" 
          alt="Imagen logo cafetería"
        />

        <nav className="mt-10">
          {categorias?.map(categoria => (
            <Categoria 
              key={categoria.id} 
              categoria={categoria} 
            />
          ))}
        </nav>
    </>
  )
}

export default Sidebar