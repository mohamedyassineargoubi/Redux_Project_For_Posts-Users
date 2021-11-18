import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deletePost, editPost } from "../actions/post.action";
import Like from "./Like";
import { isEmpty } from "./Utils";

const Post = ({ post }) => {
  const user = useSelector((state)=>state.userReducer);
  const [editToggle,setEditToggle] = useState(false);
  const [editedContent,setEditedContent] = useState(post.content);
  const dispatch = useDispatch ();
  const handleEdit = (e) => {
e.preventDefault();
const postData = {
title :post.title,
author:user[0].pseudo,
content:editedContent,
likes :post.likes,
id : post.id
}
dispatch(editPost(postData));
setEditToggle(false);

  }
  return (
    <div className="post">
      { !isEmpty (user[0]) && user[0].pseudo === post.author && (
      <div className="edit-delete">
        <img src="./icons/edit.svg" alt="edit" onClick = {()=>setEditToggle(!editToggle)} />
        <img src="./icons/delete.svg" alt="delete" onClick = {()=>dispatch(deletePost(post.id))}/>
      </div>


      )}
      <h2>{post.title}</h2>
      <img
        src="https://picsum.photos/1500/400"
        className="post-img"
        alt="img-post"
      />
      {editToggle ? (
        <form onSubmit = {(e) =>handleEdit(e)}>
          <textarea defaultValue = {post.content} onChange = {e=>setEditedContent(e.target.value)}></textarea>
          <input type="submit" value="Valider la modification" />
        </form>
      )
     :(
     <p>{post.content}</p>
     )}
     

      <div className="author">
        <h5>{post.author}</h5>
        <Like post={post} />
      </div>
    </div>
  );
};

export default Post;
