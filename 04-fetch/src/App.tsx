import { useEffect, useState } from "react";
import { IResource } from "./types";
import "./assets/scss/App.scss";
import { getResource } from "./services/API";

function App() {
  const [resource, setResource] = useState("posts");
  const [data, setData] = useState<IResource[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!resource) {
        return;
      }

      setData([]);
      setLoading(true);

      try {
        const payload = await getResource(resource);

        setData(payload);
        setLoading(false);
      } catch (e: any) {
        setLoading(false);
        setError(e.toString());
      }
    };

    fetchData();
  }, [resource]);

  return (
    <div className="container">
      <h1 className="mb-3">Fetch</h1>

      <div className="d-flex justify-content-between mb-3">
        <button
          onClick={() => setResource("albums")}
          className="btn btn-primary"
        >
          Albums
        </button>

        <button
          onClick={() => setResource("photos")}
          className="btn btn-success"
        >
          Photos
        </button>

        <button
          onClick={() => setResource("posts")}
          className="btn btn-warning"
        >
          Posts
        </button>

        <button onClick={() => setResource("todos")} className="btn btn-danger">
          Todos
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && resource && data.length > 0 && (
        <>
          <h2>{resource}</h2>
          <p>
            There are {data.length} {resource}.
          </p>

          <ol>
            {data.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}

export default App;
