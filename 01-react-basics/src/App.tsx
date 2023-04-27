import { useState } from "react";
import "./App.css";

type Post = {
  title: string;
  likes: number;
};

const App = () => {
  const [msg, setMsg] = useState("Hi mom, I'm stateful");
  const [clicks, setClicks] = useState(0);
  const [posts, setPosts] = useState<Post[]>([
    { title: "React Rocks 🤘🏻!", likes: 1337 },
    { title: "JSX Rocks Even Moar 🤘🏻!", likes: 42 },
    { title: "Got state?", likes: 3 },
  ]);
  const [salary, setSalary] = useState(10);
  const [showSalary, setShowSalary] = useState(false);

  const handleAddLike = (post: Post) => {
    post.likes++;

    setPosts([...posts]);
  };

  const handleButtonClick = () => {
    setClicks((prevClicks) => {
      return prevClicks + 1;
    }); // prevClicks = 0, return 1

    setClicks((prevClicks) => prevClicks + 1); // prevClicks = 1, return 2
  };

  const handleChangeSalary = (amount: number) => {
    if (salary + amount < 5) {
      return setSalary(5);
    }

    setSalary(salary + amount);
  };

  const handleDeletePost = (post: Post) => {
    const newPosts = posts.splice(posts.indexOf(post), 1);
    console.log(posts);

    setPosts([...posts]);
  };

  return (
    <div className="App">
      <h1>React Basics</h1>

      <h2>{msg}</h2>

      <p>You have clicked the button {clicks} times.</p>

      <button onClick={handleButtonClick} className="btn btn-success btn-lg">
        👆🏻 me!
      </button>

      <button
        onClick={() => {
          setMsg("Hi dad!");
        }}
        className="btn btn-warning btn-lg"
      >
        Hi dad!
      </button>

      <hr />

      {/*
			<button className="btn btn-primary" onClick={() => setShowSalary(true)}>Show salary</button>
			<button className="btn btn-primary" onClick={() => setShowSalary(false)}>Hide salary</button>
			*/}

      <button
        className="btn btn-primary"
        onClick={() => setShowSalary(!showSalary)}
      >
        {showSalary ? "Hide salary" : "Show salary"}
      </button>

      {showSalary && (
        <>
          <h2>Salary</h2>

          <p>Salary per hour: {salary} &euro;</p>

          {salary < 10 && (
            <div className="alert alert-warning">
              You might want to change job?
            </div>
          )}

          <div className="buttons">
            <div className="mb-1">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => {
                  handleChangeSalary(1);
                }}
              >
                Raise 1 &euro; 🤑
              </button>
              <button
                className="btn btn-warning btn-lg"
                onClick={() => {
                  handleChangeSalary(-1);
                }}
              >
                Decrease 1 &euro; 😢
              </button>
            </div>

            <div className="mb-1">
              <button
                className="btn btn-success btn-lg"
                onClick={() => {
                  handleChangeSalary(5);
                }}
              >
                Raise 5 &euro; 🤑🤑🤑
              </button>
              <button
                className="btn btn-danger btn-lg"
                onClick={() => {
                  handleChangeSalary(-5);
                }}
              >
                Decrease 5 &euro; 😢😢😢
              </button>
            </div>
          </div>
        </>
      )}

      <hr />

      <h2>Posts</h2>

      {posts.length <= 0 && <p>No posts were found...</p>}

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
    </div>
  );
};

export default App;
