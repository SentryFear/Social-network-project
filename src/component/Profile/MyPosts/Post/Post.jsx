import React from 'react';

let Post = (props) => {


    return (
        <div className="post">
            <div className="title">{props.message}</div>
            <div className="likeCount">Лайки {props.likesCount}</div>
        </div>
    )
}

export default Post;