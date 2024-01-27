import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const QuioscoContext = createContext();

function QuioscoProvider({children}){
    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    const [nombre, setNombre] = useState("")
    const [total, setTotal] = useState(0)

    const router = useRouter();

    const obtenerCategorias = async () => {
        try {
            const { data } = await axios("/api/categorias")
            setCategorias(data)
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        obtenerCategorias();
    }, []);

    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias]);

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.cantidad * producto.precio) + total, 0)
        setTotal(nuevoTotal)
    }, [pedido])
    
    const handleClickCategoria = id => {
        const categoria = categorias.filter(cat => cat.id === id)
        setCategoriaActual(categoria[0])
        router.push("/")
    }
    
    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }

    const handleAgregarPedido = ({categoriaId, ...producto}) => {
        let alertaTexto = ""
        if(pedido.some(productoState => productoState.id === producto.id)){
            const pedidoActualizado = pedido.map(pedidoItem => pedidoItem.id === producto.id ? producto : pedidoItem)
            alertaTexto = "Pedido actualizado"
            setPedido(pedidoActualizado)
        }else{
            alertaTexto = "Agregado al pedido"
            setPedido([...pedido, producto])
        }

        toast.success(alertaTexto, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });

        setModal(false)
    }

    const handleEditarCantidades = id => {
        const productoActualizar = pedido.filter(producto =>  producto.id === id);

        setProducto(productoActualizar[0])

        setModal(true)
    }

    const handleBorrarProducto = id => {
        const pedidoActualizado = pedido.filter(producto =>  producto.id !== id);
        setPedido(pedidoActualizado)
    }

    const colocarOrden = async e => {
        e.preventDefault()

        try {
            await axios.post("/api/ordenes", {pedido, nombre, total, fecha: Date.now().toString()})

            //Reseteamos la app
            setCategoriaActual(categorias[0])
            setPedido([])
            setNombre("")
            setTotal(0)

            toast.success("Orden Realizada Correctamente", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            setTimeout(() => {
                router.push("/")
            }, 3000);

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <QuioscoContext.Provider 
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                producto,
                handleSetProducto,
                modal,
                handleChangeModal,
                pedido,
                handleAgregarPedido,
                handleEditarCantidades,
                handleBorrarProducto,
                nombre, 
                setNombre,
                colocarOrden,
                total,
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export { QuioscoProvider }

export default QuioscoContext;