'use client'

import { useState } from "react"
import { signIn } from "next-auth/react"
import swal from "sweetalert"

export default function Register() {

let [name, set_name] = useState('')
let [email, set_email] = useState('')
let [password, set_password] = useState('')

return (
    <div>
        <h1 className="text-center h4 border-2 p-4 mb-4 border-bottom border-top">회원가입</h1>

        <div className="col-7 mx-auto text-center">
            <label htmlFor="inputEmail4" className="form-label">아이디</label>
            <input type="text" className="form-control" id="input_id" onChange={(e) => { set_name(e.target.value) }}/>
        </div>
        <div className="col-7 mx-auto text-center">
            <label htmlFor="inputEmail4" className="form-label">이메일</label>
            <input type="email" className="form-control" id="input_email" onChange={(e) => { set_email(e.target.value) }}/>
        </div>
        <div className="col-7 mx-auto text-center">
            <label htmlFor="inputEmail4" className="form-label">비밀번호</label>
            <input type="password" className="form-control" id="input_password" onChange={(e) => { set_password(e.target.value) }}/>
        </div>
        
        <div className="col-12 p-4 mx-auto text-center">
            <button type="submit" className="btn btn-dark" onClick={() => {
                if(!!name?.trim() && !!email?.trim() && !!password?.trim()) {
                fetch('/api/auth/signup', {method : 'POST', body : JSON.stringify({ name : name, email : email, password : password})})
                .then(r=>r.json())
                .then(result => {
                    if(result.success) {
                    swal({
                        text:result.msg,
                        icon:'success',
                    }).then(() => {
                        signIn("credentials", {
                            email : email,
                            password : password,
                            redirect: true,
                            callbackUrl: "/"
                        })
                    })
                    } else {
                        swal({
                            text:result.msg,
                            icon:'info',
                        })
                    }
                })
                } else {
                    swal({
                        text:'회원가입란을 올바르게 작성하세요',
                        icon:'warning'
                    })
                }
            }}>회원가입</button>
        </div>
    </div>
)
}