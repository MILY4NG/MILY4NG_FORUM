'use client'

import { useState } from "react"
import { signIn } from "next-auth/react"
import swal from "sweetalert"
import Link from "next/link"

export default function SignIn() {

    let [email, set_email] = useState('')
    let [password, set_password] = useState('')

    const login = async() => {
        await signIn("credentials", {
            email : email,
            password : password,
            redirect: false
        }).then((result) => {
            console.log(result)
            if(result.ok) location.href = '/'
            else {
                swal({
                    text: '이메일/비밀번호가 잘못되었습니다.',
                    icon: 'warning'
                })
            }
        })
    }

    return (
        <div>
            <h1 className="text-center h4 border-2 p-4 mb-4 border-bottom border-top">로그인</h1>
            
            <div className="col-7 mx-auto text-center">
                <label htmlFor="inputEmail4" className="form-label">이메일</label>
                <input type="email" className="form-control" id="input_email" onChange={(e) => { set_email(e.target.value) }}
                onKeyDown={() => {
                    if(window.event.keyCode == 13) {
                        if(!!email?.trim() && !!password?.trim()) login()
                        else {
                            swal({
                                text:'이메일/비밀번호를 올바르게 작성하세요',
                                icon:'warning'
                            })
                        } 
                    }
                }}/>
            </div>
            <div className="col-7 mx-auto text-center">
                <label htmlFor="inputEmail4" className="form-label">비밀번호</label>
                <input type="password" className="form-control" id="input_password" onChange={(e) => { set_password(e.target.value) }}
                onKeyDown={() => {
                    if(window.event.keyCode == 13) {
                        if(!!email?.trim() && !!password?.trim()) login()
                        else {
                            swal({
                                text:'이메일/비밀번호를 올바르게 작성하세요',
                                icon:'warning'
                            })
                        } 
                    }
                }}/>
            </div>
            <div className="col-12 p-4 mx-auto text-center">
                <button type="submit" id="loginbtn" className="btn btn-dark" onClick={() => {

                    if(!!email?.trim() && !!password?.trim()) login()
                    else {
                        swal({
                            text:'이메일/비밀번호를 올바르게 작성하세요',
                            icon:'warning'
                        })
                    } 
                }}>로그인</button>
            </div>
            <div className="col-12 p-2 mx-auto text-center">회원이 아니시면 <Link href="/register">회원가입</Link>하세요.</div>
        </div>
    )
}