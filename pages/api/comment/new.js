import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {

    let session = await getServerSession(req, res, authOptions)

    if(req.method == "POST" && session) {

        req.body = JSON.parse(req.body)

        let comment = { 
            content : req.body.content,
            parent : new ObjectId(req.body.parent),
            author : session.user.email,
            name : session.user.name
        }

        const db = (await connectDB).db('crud')
        await db.collection('comment').insertOne(comment)

        res.status(200).json()

    } 
}