import { useContext } from "react";
import { PostsContext } from "../App";
export default function Header() {
  const { appName } = useContext(PostsContext);
  return <h1>{appName}</h1>;
}
