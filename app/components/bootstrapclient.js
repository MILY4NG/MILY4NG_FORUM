'use client'
import { useEffect } from "react"

function BootStrapClient() {
    useEffect(() => {
        require('bootstrap/dist/js/bootstrap.js')
    }, [])

    return null
}

export default BootStrapClient