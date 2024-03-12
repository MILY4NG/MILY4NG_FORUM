import { connectDB } from "@/util/database";
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
    if(req.method == "POST") {

        req.body = JSON.parse(req.body)

        const db = (await connectDB).db('crud')
        let result = await db.collection('user_cred').find().toArray()  

        for(let i = 0; i < result.length; i++) {
            if(req.body.email == result[i].email) return res.status(500).json({success : false, msg : '이미 동일한 이메일로 가입되어 있습니다.'})
        }

        let hash = await bcrypt.hash(req.body.password, 10)
        req.body.password = hash

        await db.collection('user_cred').insertOne(req.body)

        res.status(200).json({success : true, msg : '회원가입에 성공하였습니다.'})
    }
}