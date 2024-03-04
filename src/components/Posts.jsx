import { useContext } from "react";
import { PostsContext } from "../App";

export default function Posts() {
  const { posts } = useContext(PostsContext);
  return (
    <>
      {posts.map((post, index) => {
        return (
          <div key={index} className="card">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        );
      })}
    </>
  );
}
