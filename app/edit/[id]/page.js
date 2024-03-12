import { connectDB } from "@/util/database"
import {ObjectId} from "mongodb"

export default async function Edit(props) {

    const db = (await connectDB).db('crud')
    let result = await db.collection('post').findOne({ _id : new ObjectId(props.params.id) })

    return ( 
        <div>
            <h1 className="text-center h4 border-2 p-4 mb-4 border-bottom border-top">글 수정</h1>
            <form action="/api/post/edit" method="POST" className="form-floating">
                <div className="col-11 mx-auto text-center">
                    <label htmlFor="floatingInputValue" className="form-label">글 제목</label>
                    <input name="title" type="text" className="form-control" id="floatingInputValue" defaultValue={result.title}/>
                </div>
                <div className="text-center col-11 mx-auto">
                    <label htmlFor="floatingTextarea2" className="form-label">글 내용</label>
                    <textarea name="content" className="form-control" id="floatingTextarea2" style={{ height: '350px', resize: "none" }} defaultValue={result.content}></textarea>
                </div>
                <input name="_id" type="hidden" defaultValue={result._id.toString()}/>
                <div className="col-12 p-4 mx-auto text-center">
                    <button type="submit" className="btn btn-dark" style={{ width: '100px' }}>수정</button>
                </div>
            </form>
        </div>
    )
}