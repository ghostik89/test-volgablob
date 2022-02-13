import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import JSONPretty from "react-json-pretty";

export const CommentPage = () => {
    let { id } = useParams();
    const [comment, setComment] = useState({})

    useEffect(() => {
        fetch(`api/v1/comments/${id}`)
            .then(req => req.json())
            .then(res => setComment(res))
    },[])

    return (
        <div className={'container'}>
            <h2>Detailed comment</h2>
            <Link to={'/'} className="page-link">go back</Link>
            <JSONPretty data={comment}/>
        </div>
    )
}