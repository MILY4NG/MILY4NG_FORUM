import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"

export default async function Write() {

    let session = await getServerSession(authOptions)

    return (
        <div>
            { session ? 
            <div>
                <h1 className="text-center h4 border-2 p-4 mb-4 border-bottom border-top">글 작성</h1>
                <form action="/api/post/new" method="POST" className="form-floating">
                    <div className="text-center col-11 mx-auto">
                        <label htmlFor="floatingInputValue" className="form-label">글제목</label>
                        <input name="title" type="text" className="form-control" id="floatingInputValue" required/>
                    </div>
                    <div className="text-center col-11 mx-auto">
                        <label htmlFor="floatingTextarea2" className="form-label">글 내용</label>
                        <textarea name="content" className="form-control" id="floatingTextarea2" style={{ height: '350px', resize: "none" }} required></textarea>
                    </div>
                    <div className="col-12 p-4 mx-auto text-center">
                        <button type="submit" className="btn btn-dark" style={{ width: '100px' }}>게시</button>
                    </div>
                </form>
            </div> 
            : 
            <span>글을 작성하려면 로그인하세요.</span>
            }
        </div>
    )
}