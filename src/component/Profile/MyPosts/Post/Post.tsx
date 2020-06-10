import React from 'react';

type PropsType = {
    message: string
    likesCount: number
}

let Post: React.FC<PropsType> = (props) => {


    return (
        <div className="post">
            <div className="title">{props.message}</div>
            <div className="likeCount">Лайки {props.likesCount}</div>
        </div>
    )
}

export default Post;