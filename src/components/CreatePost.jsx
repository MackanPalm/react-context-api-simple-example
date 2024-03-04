import { useState, useContext } from "react";
import { PostsContext } from "../App";

const INITIAL_POST = {
  title: "",
  content: "",
};

const loadDataFromLocalStorage = () => {
  const postDataValue = localStorage.getItem("postData");

  console.log("postDataValue", postDataValue);
  //The && (and) should not work but for some reason it does. it was an || (or) before. But then I got error messages where it went into the if-statement even though postDataValue was null. Tried changing it just to see what would happen. somehow this worked.
  if (postDataValue !== null && postDataValue !== undefined) {
    console.log("if postdata is null, i should not be called");
    try {
      return JSON.parse(postDataValue);
    } catch {
      console.log("had an error: returning initial post");
      return { ...INITIAL_POST };
    }
  }
  console.log("trying to do this");
  return { ...INITIAL_POST };
};

export default function CreatePost() {
  const { posts, setPosts } = useContext(PostsContext);

  const [post, setPost] = useState(loadDataFromLocalStorage());

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedPost = {
      ...post,
      [name]: value,
    };
    setPost(updatedPost);
    localStorage.setItem("postData", JSON.stringify(updatedPost));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPosts([...posts, post]);
    setPost(INITIAL_POST);
    localStorage.removeItem("postData");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={post.title}
        ></input>
      </label>
      <br />
      <label>
        Content:
        <textarea
          name="content"
          onChange={handleChange}
          value={post.content}
          cols={50}
          rows={5}
        ></textarea>
      </label>
      <br />
      <input type="submit" value="Post!"></input>
    </form>
  );
}
