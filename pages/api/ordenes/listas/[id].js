import { PrismaClient } from "@prisma/client"

export default async function handler(req, res){
    const prisma = new PrismaClient();

    if(req.method === "PUT"){
        const {id} = req.query

        const ordenEntregada = await prisma.orden.update({
            where: {
                id: parseInt(id)
            },
            data: {
                flagDelete: true,
            }
        })
        
        res.status(200).json(ordenEntregada)
    }
}