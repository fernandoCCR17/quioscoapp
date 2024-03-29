import { PrismaClient } from "@prisma/client"


export default async function handler(req, res) {
    const prisma = new PrismaClient();

    // Obtener ordenes
    if(req.method === "GET"){
        const ordenes = await prisma.orden.findMany({
            where: {
                estado: false,
                flagDelete: false
            }
        })
        res.status(200).json(ordenes)
    }

    // Enviar ordenes
    if(req.method === "POST"){
        const orden = await prisma.orden.create({
            data: {
                nombre: req.body.nombre,
                fecha: req.body.fecha,
                total: req.body.total,
                pedido: req.body.pedido,
            }
        })
        res.status(200).json(orden)
    }
}
