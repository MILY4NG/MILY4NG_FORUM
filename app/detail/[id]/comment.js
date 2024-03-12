'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import swal from "sweetalert"

export default function Comment(props) {

    let [comment, set_comment] = useState('')
    let [data, set_data] = useState([])

    const router = useRouter()

    function comment_load() {
        fetch(`/api/comment/list?_id=${props._id.toString()}`).then((r)=>r.json())
        .then((result) => {
            set_data(result)
        }) 
    }

    useEffect(() => {
        comment_load()
    }, [])
    // 뒤에 [] 붙이면 html 로드시 1회만 실행됨.

    return (
        <div>
            {
                data.length > 0 ? 
                    data.map((a, i) => {
                    return (
                        <p key={i}>{a.name} : {a.content}</p>
                        )
                    })
                : '댓글 없음..'
            }


            {
                props.session ? 
                <div className="border-3 border-top p-2">
                    <div className="col-12 mx-auto text-center">
                        <label htmlFor="inputEmail4" className="form-label">댓글 작성</label>
                        <textarea name="content" className="form-control" id="comment_input" style={{ height: '100px', resize: 'none' }} onChange={(e) => { set_comment(e.target.value) }}></textarea>
                    </div>
                    <div className="col-12 p-2 mx-auto text-end">
                        <button type="submit" className="btn btn-dark" style={{width: "75px"}} onClick={() => {
                            if(!!comment?.trim()) {
                                fetch('/api/comment/new',
                                {method : 'POST',body : JSON.stringify({content : comment, parent : props._id.toString()}) })
                                .then(() => {
                                    set_comment('')
                                    comment_load()
                                    document.getElementById('comment_input').value = null
                                })

                            } else {
                                swal({
                                    icon: "warning",
                                    text: "댓글을 올바르게 작성해 주세요."
                                })
                            }
                        }}>게시</button>
                    </div>
                </div>
                : 
                <div className="border-3 border-top p-2">
                    <div className="col-12 mx-auto text-center">
                        <label htmlFor="inputEmail4" className="form-label">댓글을 작성하려면 로그인하세요.</label>
                        <textarea name="content" className="form-control" id="comment_input" style={{ height: '100px', resize: 'none' }} disabled></textarea>
                    </div>
                    <div className="col-12 p-2 mx-auto text-end">
                        <button type="submit" className="btn btn-dark" style={{width: "75px"}} disabled>게시</button>
                    </div>
                </div>
            }
        </div>
    )
}