import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]"

export default async function handler(req, res) {  

    let session = await getServerSession(req, res, authOptions)

    if(session) {
        const db = (await connectDB).db('crud')
        let post = await db.collection('post').findOne({_id: new ObjectId(req.query.id)})

        if(post.author == session.user.email || session.user.email == process.env.ADMIN_EMAIL) {
            await db.collection('post').deleteOne({_id : new ObjectId(req.query.id)})
            res.status(200).redirect('/')
        } else {
            res.status(500).json()
        }
    } else {
        res.status(500).json()
    }


}