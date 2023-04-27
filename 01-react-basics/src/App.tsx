import { useState } from "react";
import ClickCounter from "./components/ClickCounter";
import Salary from "./components/Salary";
import "./App.css";

type Post = {
  title: string;
  likes: number;
};

const App = () => {
  const [msg, setMsg] = useState("Hi mom, I'm stateful");
  const [posts, setPosts] = useState<Post[]>([
    { title: "React Rocks 🤘🏻!", likes: 1337 },
    { title: "JSX Rocks Even Moar 🤘🏻!", likes: 42 },
    { title: "Got state?", likes: 3 },
  ]);

  // input state
  const [newPostTitle, setNewPostTitle] = useState("");

  const handleAddLike = (post: Post) => {
    post.likes++;

    setPosts([...posts]);
  };

  const handleDeletePost = (postToDelete: Post) => {
    setPosts(posts.filter((post) => post !== postToDelete));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPost: Post = { title: newPostTitle, likes: 0 };

    setPosts([...posts, newPost]);
    setNewPostTitle("");
  };

  return (
    <div className="App">
      <h1>React Basics</h1>

      <h2>{msg}</h2>

      <ClickCounter />

      <button
        onClick={() => {
          setMsg("Hi dad!");
        }}
        className="btn btn-warning btn-lg"
      >
        Hi dad!
      </button>

      <hr />

      <Salary />

      <hr />

      <h2>Posts</h2>

      <form className="mb-3" onSubmit={handleFormSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Post title..."
            onChange={(e) => setNewPostTitle(e.target.value)}
            value={newPostTitle}
            required
          />
          <button type="submit" className="btn btn-primary">
            Create
          </button>
          <div className="form-text text-warning">
            Title has to be atleast 5 characters long.
          </div>
        </div>
      </form>

      {posts.length <= 0 && <p>No posts were found... 😟</p>}

      {posts.length > 0 && (
        <ul>
          {posts.map((post, index) => (
            <li className="mb-1" key={index}>
              {post.title} ({post.likes} likes)
              <button
                className="btn btn-success btn-sm ms-1"
                onClick={() => handleAddLike(post)}
              >
                ♥
              </button>
              <button
                className="btn btn-danger ms-1"
                onClick={() => handleDeletePost(post)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
