import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(req, res) {

    let session = await getServerSession(req, res, authOptions)

    if(session) {
        req.body.author = session.user.email
        req.body.name = session.user.name
    }
    
    if(req.method == "POST") {
        if(req.body.title == '' || req.body.content == '') return res.status(500).json('게시물을 올바르게 작성하지 않았습니다.')

        const db = (await connectDB).db('crud')
        
        let lines = req.body.content.split("\n")
        if(lines[lines.length-1].trim() === "") {
            lines.splice(lines.length-1)
            lines[lines.length-1] = lines[lines.length-1].replace(/(\r\n|\n|\r)/gm, "");
        }
        req.body.content = lines.join("\n")

        await db.collection('post').insertOne(req.body)

        res.status(200).redirect(`/`)
    } 
}