'use client'

import { useEffect, useState } from "react";

export default function ContentArea(props) {
    const [mobile, setMobile] = useState(false);

    function os_check() {
        var userOs = navigator.userAgent.replace(/ /g, '').toLowerCase()
        if( userOs.match(/macintosh/i) == "macintosh") {
            return "mac"
        }else if(userOs.match(/window/i) == "window") {
            return "window"
        }else if(userOs.match(/android/i) == "android") {
            return "android"
        }else if(userOs.match(/iphone/i) == "iphone") {
            return "ios"
        }else if(userOs.match(/ipad/i) == "ipad") {
            return "ipad"
        }
    }

    function set_textarea() {
        let textarea = document.getElementById('content')
        
        textarea.style.height = '5px'
        textarea.style.height = (textarea.scrollHeight) + 'px'

    }

    useEffect(() => {
        let textarea = document.getElementById('content')
        
        textarea.innerHTML = props.content

        let os = os_check()

        if(os == "ios" || os == "android" || os == "ipad") {
            window.addEventListener('orientationchange', ()=> {
                setTimeout(() => {
                    set_textarea()
                }, 15);
            })
        } else if(os == "window" || os == "mac") {
            window.addEventListener('resize', ()=> {
                set_textarea()
            })
        }

        set_textarea()
    }, []);

    return (
        <textarea id="content" style={{ border: 'none', outline: '0', width: "100%", resize: 'none', background: 'white', display: 'block' }} readOnly></textarea>
    )
}