import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res){
    if(req.method === "GET"){
        const ordenesListas = await prisma.orden.findMany({
            where:{
                estado: true,
                flagDelete: false
            }
        })
        
        res.status(200).json(ordenesListas)
    }
}