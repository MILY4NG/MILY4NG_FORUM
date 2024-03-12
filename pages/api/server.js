import { connectDB } from "@/util/database"

export default async function Server(req, res) {
    const db = (await connectDB).db('crud')
    let result = await db.collection('post').find().toArray()  

    if(req.method == "POST") {
        res.status(200).json(result)
    }
}