"use client";

import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ListItem(props) {

    const router = useRouter()
    useEffect(() => {
        router.refresh()
    }, [])

    return (
        <div>
            {
                props.result.map(function (c, i) {
                    return (
                        <div className="list-item" key={i}>
                            <Link href={`/detail/${c._id.toString()}`}><h4>{c.title}</h4></Link>
                            <p>날짜:몰라</p>
                        </div>
                    )
                })
            }
        </div>
    )
}