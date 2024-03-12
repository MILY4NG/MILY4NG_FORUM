import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"

export default async function handler(req, res) {
    if(req.method == "POST") {
        if(req.body.title == '' || req.body.content == '') return res.status(500).json('게시물을 올바르게 작성하지 않았습니다.')
        
        const db = (await connectDB).db('crud')
        await db.collection('post').updateOne({ _id : new ObjectId(req.body._id) }, {$set : {title : req.body.title, content : req.body.content }})

        res.status(200).redirect(`/detail/${req.body._id}`)
    }
}