import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function halder(req, res) {

    const db = (await connectDB).db('crud')
    let result = await db.collection('comment').find({ parent : new ObjectId(req.query._id) }).toArray()

    res.status(200).json(result)
}