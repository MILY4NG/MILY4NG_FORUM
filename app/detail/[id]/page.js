import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import Comment from "./comment"
import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import ContentArea from "./contentarea"
import Link from "next/link"

export default async function Detail(props) {

    let session = await getServerSession(authOptions)

    const db = (await connectDB).db('crud')
    let content

    try {
        let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) })
        content = result
    } catch(e) {
        return (
            <div>
                삭제되었거나 없는 글입니다.
            </div>
        )
    }

    if(content == null) {
        return (
            <div>
                삭제되었거나 없는 글입니다.
            </div>
        )
    }

    return (
        <div>
            <h1 className="text-center h4 border-2 p-2 mb-4 border-top">{content.title}</h1>
            <div style={{margin: "0px 5px"}}>
                <h6 className='col text-start' style={{margin: '0px', float: 'left'}}>작성자 : {content.name}</h6>
                {
                    session ? (
                        session.user.email == content.author || session.user.email == process.env.ADMIN_EMAIL ?
                        <div>
                            <Link className="" style={{float: 'right', marginLeft: '5px'}} href={`/edit/${content._id.toString()}`}>✏️</Link>
                            <Link className="" style={{float: 'right'}} href={`/api/post/delete/${content._id.toString()}`}>🗑️</Link>
                        </div>
                        :
                        ''
                    )
                    :
                    ''
                }
                <hr style={{clear:'both'}}></hr>
                <ContentArea content={content.content}></ContentArea>
                <hr></hr>
                <h1 className="h4 mb-4">댓글</h1>
                <Comment session={session} _id={content._id.toString()}></Comment> 
                
            </div>
        </div>
    )
}