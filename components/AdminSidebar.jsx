import Image from "next/image"
import { useRouter } from "next/router"

const paginas = [
    {paginaId: 1, nombre: "Cocina", url: "/admin/cocina"},
    {paginaId: 2, nombre: "Caja", url: "/admin/caja"},
]

const AdminSidebar = () => {
    const router = useRouter()
    
  return (
    <>
        <Image 
          width={300} 
          height={200} 
          src="/assets/img/logo.svg" 
          alt="Imagen logo"
        />

        <nav className="mt-10">
            {paginas.map(pagina => (
                <div 
                    className={`${router.pathname === pagina.url ? "bg-amber-400" : ""} flex items-center gap-4 w-full border p-5 hover:bg-amber-400 transition-colors`}
                    key={pagina.paginaId}
                >
                    <button
                        type="button"
                        className="text-lg lg:text-2xl font-bold hover:cursor-pointer"
                        onClick={() => router.push(pagina.url)}
                    >
                        {pagina.nombre}
                    </button>
                </div>
            ))}
        </nav>
    </>
  )
}

export default AdminSidebar